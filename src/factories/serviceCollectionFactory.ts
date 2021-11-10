import { TelemetryClient } from "applicationinsights";
import axios from "axios";
import NodeClient from "applicationinsights/out/Library/NodeClient";
import { Template, Parameters, ServiceCollection, Configuration, PlaybookConfiguration, Downloadable } from "../models";
import {
  AgileService,
  AgileServiceProvider,
  ApplicationInsightsLogger,
  ApplicationInsightsMetrics,
  AzureDevOpsAgileService,
  CompositeLogger,
  ConsoleLogger,
  FileStorageService,
  GitHubAgileService,
  DownloadablePlaybookService,
  InquirerInputService,
  JiraAgileService,
  PlaybookService,
  ProjectService,
  RepositoryProjectService,
  StoredConfigurationService,
  TemplateFilterOptions,
} from "../services";
import { FileConstants } from "../constants";
import { Octokit } from "@octokit/rest";
import { GitVersionType } from "azure-devops-node-api/interfaces/GitInterfaces";
import { VersionControlRecursionType } from "azure-devops-node-api/interfaces/TfvcInterfaces";
import { GitApi } from "azure-devops-node-api/GitApi";
import { getPersonalAccessTokenHandler } from "azure-devops-node-api";

/**
 * Factory for collections of services
 */
export class ServiceCollectionFactory {
  /**
   * Create collection of shared services
   *
   * @returns {ServiceCollection} Service Collection
   */
  public static async create(): Promise<ServiceCollection> {
    const consoleLogger = new ConsoleLogger();
    const configurationStorageService = new FileStorageService<Configuration>(process.cwd(), consoleLogger);
    const configurationService = new StoredConfigurationService(configurationStorageService, consoleLogger);

    const loggers = [consoleLogger];
    if (await configurationService.isAppInsightsEnabled()) {
      const nodeClient = new NodeClient();
      loggers.push(new ApplicationInsightsLogger(nodeClient));
    }

    const logger = new CompositeLogger(loggers);

    const inputService = new InquirerInputService(logger);
    const parameterService = new FileStorageService<Parameters>(process.cwd(), logger);
    const templateService = new FileStorageService<Template>(process.cwd(), logger);

    const activePlaybookServiceFactoryMap = new Map<string, () => PlaybookService>();
    const activeProjectServiceFactoryMap = new Map<string, () => ProjectService>();

    const playbooks = (await configurationService.getPlaybooks()).filter((playbook) => !!playbook.isActive);
    playbooks.forEach((playbook) => {
      let shouldSkip = false;

      try {
        new URL(playbook.location);
      } catch (e: unknown) {
        if (e instanceof TypeError) {
          shouldSkip = true;
          logger.error(
            `Could not parse ${playbook.location} as a URL. Skipping playbook ${playbook.playbookName} as local file locations are not supported.`,
          );
        } else {
          throw e;
        }
      }

      let playbookService: PlaybookService;
      const downloadTemplate = async (downloadable: Downloadable): Promise<Template> => {
        const url = downloadable.download_url || downloadable.url;
        if (!url) {
          throw new Error(`Downloadable ${downloadable} did not have download_url or url defined.`);
        }
        return (await axios.get<Template>(url)).data;
      };

      if (!shouldSkip) {
        if (!playbook.token) {
          logger.error(`Token required. Skipping playbook ${playbook.playbookName}`);
        } else if (playbook.location.includes("github.com")) {
          const octokit = new Octokit();
          playbookService = new DownloadablePlaybookService(
            async (configuration: PlaybookConfiguration, options?: TemplateFilterOptions): Promise<Downloadable[]> => {
              const indexOfGithub = configuration.location.indexOf("github.com/");
              const indexOfOwner = indexOfGithub + 11;
              const indexOfRepository = configuration.location.indexOf("/", indexOfOwner) + 1;
              const endIndexOfRepository = configuration.location.indexOf("/", indexOfRepository) + 1;

              const owner = configuration.location.substring(indexOfOwner, indexOfRepository);
              const repo = configuration.location.substring(indexOfRepository, endIndexOfRepository);

              const path = configuration.templatesPath ?? FileConstants.templatesPath;

              return ServiceCollectionFactory.getGitHubTemplates({ ...options, owner, repo, path }, octokit);
            },
            downloadTemplate,
            playbook,
          );
        } else if (playbook.location.includes("azure.com")) {
          const handler = getPersonalAccessTokenHandler(playbook.token);
          const gitApi = new GitApi(playbook.location, [handler]);
          playbookService = new DownloadablePlaybookService(
            async (configuration: PlaybookConfiguration, options?: TemplateFilterOptions): Promise<Downloadable[]> => {
              const versionDescriptor = {
                version: options?.branch,
                versionType: GitVersionType.Branch,
              };
              const gitItems = await gitApi.getItems(
                configuration.location,
                undefined,
                options?.subdirectory,
                VersionControlRecursionType.Full,
                true,
                undefined,
                undefined,
                undefined,
                options?.branch ? versionDescriptor : undefined,
              );
              const content: Downloadable[] = [];

              for (const gitItem of gitItems) {
                if (!gitItem.isFolder) {
                  if (!gitItem.url) {
                    throw Error("url is unexpectedly null.");
                  }
                  // check if name matches
                  if (gitItem.contentMetadata?.fileName == options?.name) {
                    content.push(gitItem);
                  }
                }
              }

              return content;
            },
            downloadTemplate,
            playbook,
          );
        } else {
          throw Error(`Playbooks at ${playbook.location} are not currently implemented.`);
        }

        activePlaybookServiceFactoryMap.set(playbook.playbookName, () => playbookService);
      }
    });

    const projects = (await configurationService.getProjects()).filter((project) => !!project.isActive);
    projects.forEach((project) => {
      if (!project.token) {
        logger.error(`Token required. Skipping project ${project.projectName}`);
      } else {
        let agileService: AgileService;
        if (project.url.includes("github.com")) {
          agileService = new GitHubAgileService(
            { agileProvider: AgileServiceProvider.GitHub, baseUrl: project.url.toString(), accessToken: project.token },
            logger,
          );
        } else if (project.url.includes("azure.com")) {
          agileService = new AzureDevOpsAgileService(
            {
              agileProvider: AgileServiceProvider.AzureDevOps,
              baseUrl: project.url.toString(),
              accessToken: project.token,
            },
            logger,
          );
        } else if (project.url.includes("jira.com")) {
          agileService = new JiraAgileService();
        }

        activeProjectServiceFactoryMap.set(project.projectName, () => new RepositoryProjectService(agileService));
      }
    });

    const nodeClient = new TelemetryClient(await configurationService.getAppInsightsAPIKey());
    const metrics = new ApplicationInsightsMetrics(nodeClient);

    return {
      activePlaybookServiceFactoryMap,
      activeProjectServiceFactoryMap,
      templateService,
      parameterService,
      configurationService,
      logger,
      inputService,
      metrics,
    };
  }

  private static async getGitHubTemplates(
    options: TemplateFilterOptions & { owner: string; repo: string; path: string },
    octokit: Octokit,
  ): Promise<Downloadable[]> {
    const { data } = await octokit.repos.getContent({
      owner: options.owner,
      repo: options.repo,
      path: options.path,
      ref: options?.branch,
    });

    if (data instanceof Array) {
      const downloadables = await Promise.all(
        data.map(async (item) => {
          return this.getGitHubTemplates({ ...options, path: item.path }, octokit);
        }),
      );
      return downloadables.reduce((prev, curr) => prev.concat(curr));
    } else if (data as Downloadable) {
      return [data];
    }

    return [];
  }
}
