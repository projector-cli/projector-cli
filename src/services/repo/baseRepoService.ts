import { join } from "path";
import { ObjectService } from "..";
import { Repo, RepoItem, RepoItemType, RepoProviderOptions, RepoService } from "../../models";

export abstract class BaseRepoService implements RepoService {
  constructor(protected options: RepoProviderOptions, protected contentService: ObjectService<string>) {}
  // Base functions

  public async downloadRepoItem(
    repo: string,
    path?: string,
    branch?: string,
    outputPath: string = process.cwd(),
  ): Promise<void> {
    const repoItem = await this.getRepoItem(repo, path, true, branch);
    await this.writeRepoItem(repoItem, outputPath);
  }

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

  // Private functions
  private async writeRepoItem(repoItem: RepoItem, outputPath: string): Promise<void> {
    const { content, children, name, type } = repoItem;

    if (type === RepoItemType.Directory) {
      if (children) {
        const subdirectory = join(outputPath, name);

        await Promise.all(children.map(async (item: RepoItem) => this.writeRepoItem(item, subdirectory)));
      }
    } else if (content) {
      this.contentService.set(name, content, outputPath);
    }
  }
}
