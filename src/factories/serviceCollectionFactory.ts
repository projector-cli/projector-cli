import NodeClient from "applicationinsights/out/Library/NodeClient";
import { Template, Parameters, ServiceCollection, Configuration, RepoService } from "../models";
import {
  AgileService,
  AgileServiceProvider,
  AzureDevOpsAgileService,
  AzureDevOpsRepoService,
  CompositeLogger,
  ConsoleLogger,
  FileStorageService,
  GitHubAgileService,
  GitHubRepoService,
  InquirerInputService,
  JiraAgileService,
  MetricsProvider,
  PlaybookService,
  ProjectService,
  RepoServiceProvider,
  RepositoryPlaybookService,
  RepositoryProjectService,
  StoredConfigurationService,
} from "../services";
import { ApplicationInsightsLogger } from "../services/logger/applicationInsightsLogger";
import { MetricsFactory } from "./metricsFactory";

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
      let repoService: RepoService;
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

      if (!playbook.token) {
        logger.error(`Token required. Skipping playbook ${playbook.playbookName}`);
      } else if (!shouldSkip) {
        if (playbook.location.includes("github.com")) {
          repoService = new GitHubRepoService({
            repoProvider: RepoServiceProvider.GitHub,
            baseUrl: playbook.location.toString(),
            accessToken: playbook.token,
          });
        } else if (playbook.location.includes("azure.com")) {
          repoService = new AzureDevOpsRepoService({
            repoProvider: RepoServiceProvider.AzureDevOps,
            baseUrl: playbook.location.toString(),
            accessToken: playbook.token,
          });
        } else {
          console.error(`Couldn't load playbook ${playbook.playbookName} from ${playbook.location}`);
        }

        activePlaybookServiceFactoryMap.set(playbook.playbookName, () => new RepositoryPlaybookService(repoService));
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

    return {
      activePlaybookServiceFactoryMap,
      activeProjectServiceFactoryMap,
      templateService,
      parameterService,
      configurationService,
      logger,
      inputService,
      metrics: MetricsFactory.getIfRegistered(MetricsProvider.AppInsights),
    };
  }
}
