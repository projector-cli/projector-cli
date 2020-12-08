import { GitHubRepoInfo, ServiceProviderOptions } from "../models";

export class RegexExtractor {
  public static getGitHubInfo(options: ServiceProviderOptions): GitHubRepoInfo {
    const { baseUrl, projectName } = options;
    const repoUrl = `${baseUrl}${baseUrl.endsWith("/") ? "" : "/"}${projectName}`;

    const matchGroups = repoUrl.match(/(?<baseUrl>http.+\.com)\/(?<owner>[a-zA-Z0-9\-]+)\/(?<repo>[a-zA-Z0-9\-]+)/)
      ?.groups;

    if (matchGroups) {
      const { baseUrl, owner, repo } = matchGroups;
      return {
        baseUrl,
        owner,
        repo,
      };
    }

    throw new Error(`Invalid repo url: ${repoUrl}. Should match {baseUrl}/{owner}/{repo}`);
  }
}
