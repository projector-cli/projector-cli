import { Octokit } from "@octokit/rest";
import axios from "axios";
import { basename } from "path";
import { Repo, RepoItem, RepoItemType, RepoProviderOptions } from "../../../models";
import { Template } from "../../../models/agile/template";
import { RegexExtractor } from "../../../utils";
import { BaseRepoService } from "../baseRepoService";

export class GitHubRepoService extends BaseRepoService {
  private github: Octokit;
  private owner: string;

  constructor(options: RepoProviderOptions) {
    super(options);

    const { accessToken } = options;

    const { owner } = RegexExtractor.getGitHubInfo(options);
    this.owner = owner;

    this.github = new Octokit({
      userAgent: "projector",
      // Allows for optional access token while not changing the interface
      auth: accessToken.length ? accessToken : undefined,
    });
  }

  listRepos = async (): Promise<Repo[] | undefined> => {
    throw new Error("Not implemented");
  };

  getRepo = async (): Promise<Repo | undefined> => {
    throw new Error("Not implemented");
  };

  createRepo = (): Promise<Repo> => {
    throw new Error("Not implemented");
  };

  deleteRepo = (): Promise<void> => {
    throw new Error("Not implemented");
  };

  getRepoItem = async (repo: string, path = "", includeContent?: boolean, branch = "main"): Promise<RepoItem> => {
    const { data } = await this.github.repos.getContent({
      owner: this.owner,
      repo,
      path,
      ref: branch,
    });
    if (data instanceof Array) {
      const children: RepoItem[] = await Promise.all(
        data.map(async (item) => {
          return this.getRepoItem(repo, item.path, includeContent, branch);
        }),
      );
      return {
        name: basename(path),
        type: RepoItemType.Directory,
        path,
        children,
      };
    } else {
      const { download_url } = data;
      if (!download_url) {
        throw new Error("Download_url unexpectedly null");
      } else if (includeContent) {
        const content = (await axios.get<Template>(download_url)).data;
        return {
          name: basename(path),
          type: RepoItemType.File,
          path,
          content,
        };
      } else {
        return {
          name: basename(path),
          type: RepoItemType.File,
          path,
        };
      }
    }
  };

  latestCommit = async (repo: string, branch = "main"): Promise<string> => {
    const { data } = await this.github.repos.getCommit({
      owner: this.owner,
      repo,
      ref: branch,
    });

    const { sha } = data;
    if (!sha) {
      throw new Error(`Could not find latest commit for ${this.owner}/${repo}`);
    }
    return sha;
  };
}
