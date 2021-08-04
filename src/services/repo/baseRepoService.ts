import { Repo, RepoItem, RepoItemType, RepoProviderOptions, RepoService } from "../../models";

export abstract class BaseRepoService implements RepoService {
  constructor(protected options: RepoProviderOptions) {}
  // Base functions

  public async listRepoItems(repo: string, path = "", includeContent = false, branch?: string): Promise<RepoItem[]> {
    const repoItem = await this.getRepoItem(repo, path, false, branch);
    const { type, children } = repoItem;

    if (type !== RepoItemType.Directory || !children) {
      return [];
    }

    if (!includeContent) {
      return children;
    }

    return Promise.all(
      children.map((child: RepoItem) => {
        const { path: childPath } = child;
        return this.getRepoItem(repo, childPath, true, branch);
      }),
    );
  }

  // Abstract functions
  abstract listRepos: () => Promise<Repo[] | undefined>;
  abstract getRepo: (repo: string) => Promise<Repo | undefined>;
  abstract createRepo: (repoName: string) => Promise<Repo>;
  abstract deleteRepo: (repo: string) => Promise<void>;

  abstract getRepoItem: (repo: string, path?: string, includeContent?: boolean, branch?: string) => Promise<RepoItem>;
  abstract latestCommit: (repo: string, branch?: string) => Promise<string>;
}
