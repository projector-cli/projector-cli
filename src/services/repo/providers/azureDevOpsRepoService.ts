import { getPersonalAccessTokenHandler } from "azure-devops-node-api";
import { CoreApi } from "azure-devops-node-api/CoreApi";
import { GitApi } from "azure-devops-node-api/GitApi";
import { GitRepository } from "azure-devops-node-api/interfaces/TfvcInterfaces";
import { ObjectService } from "../..";
import { Repo, RepoItem, RepoProviderOptions } from "../../../models";
import { BaseRepoService } from "../baseRepoService";

export class AzureDevOpsRepoService extends BaseRepoService {
  /* Name of Azure DevOps Project */
  private projectName: string;
  private coreApi: CoreApi;
  /* Git API */
  private gitApi: GitApi;

  constructor(options: RepoProviderOptions, contentService: ObjectService<string>) {
    super(options, contentService);

    const { accessToken, baseUrl, projectName } = options;

    if (!projectName) {
      throw new Error("Need to provide a project name to use Azure DevOps");
    }

    this.projectName = projectName;
    const authHandler = getPersonalAccessTokenHandler(accessToken);
    this.gitApi = new GitApi(baseUrl, [authHandler]);
    this.coreApi = new CoreApi(baseUrl, [authHandler]);
  }

  listRepos = async (): Promise<Repo[] | undefined> => {
    const repos = await this.gitApi.getRepositories(this.projectName);
    if (!repos) {
      return undefined;
    }

    return repos.map(this.mapRepo);
  };

  getRepo = async (repoName: string): Promise<Repo | undefined> => {
    const repo = await this.gitApi.getRepository(repoName, this.projectName);
    if (!repo) {
      return undefined;
    }

    return this.mapRepo(repo);
  };

  createRepo = async (repoName: string): Promise<Repo> => {
    const existingRepo = await this.getRepo(repoName);
    if (existingRepo) {
      return existingRepo;
    }

    const project = await this.coreApi.getProject(this.projectName);
    const gitRepo = await this.gitApi.createRepository(
      {
        name: repoName,
        project: {
          id: project.id,
        },
      },
      this.projectName,
    );
    return this.mapRepo(gitRepo);
  };

  deleteRepo = async (repoId: string): Promise<void> => {
    return this.gitApi.deleteRepository(repoId, this.projectName);
  };

  getRepoItem = async (): Promise<RepoItem> => {
    throw new Error("Not implemented");
  };

  latestCommit = async (): Promise<string> => {
    throw new Error("Not implemented");
  };

  private mapRepo(repo: GitRepository): Repo {
    const { name, id, remoteUrl } = repo;

    return {
      name: name as string,
      id,
      remoteUrl,
    };
  }
}
