import { Repo, RepoItem, RepoProviderOptions } from "../../models";
import { BaseRepoService } from "../../services";

export class SimulatorRepoService extends BaseRepoService {
  listRepos: () => Promise<Repo[]>;
  getRepo: (repo: string) => Promise<Repo>;
  createRepo: (repoName: string) => Promise<Repo>;
  deleteRepo: (repo: string) => Promise<void>;
  getRepoItem: (repo: string, path?: string, includeContent?: boolean, branch?: string) => Promise<RepoItem>;
  latestCommit: (repo: string, branch?: string) => Promise<string>;

  constructor(options: RepoProviderOptions) {
    super(options);

    this.listRepos = jest.fn();
    this.getRepo = jest.fn();
    this.createRepo = jest.fn();
    this.deleteRepo = jest.fn();
    this.getRepoItem = jest.fn();
    this.latestCommit = jest.fn();
  }
}
