export interface GitHubRepoInfo {
  /**
   * Base url for GitHub instance (e.g. https://github.com)
   */
  baseUrl: string;
  /**
   * Owner of GitHub repo (organization or account name)
   */
  owner: string;
  /**
   * Name of repo
   */
  repo: string;
}
