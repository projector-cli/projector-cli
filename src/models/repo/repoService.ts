import { Repo } from "./repo";
import { RepoItem } from "./repoItem";

/**
 * Service for interacting with remote repositories
 */
export interface RepoService {
  /**
   * List all repos belonging to an owner
   *
   * @returns {Promise<Repo[]|undefined>} Repos
   */
  listRepos: () => Promise<Repo[] | undefined>;

  /**
   * Get a repo
   *
   * @param {string} repoName Repo name
   * @returns {Promise<Repo|undefined>} Repo
   */
  getRepo: (repoName: string) => Promise<Repo | undefined>;

  /**
   * Create a repo
   *
   * @param {Repo} repoName Repo to create
   * @returns {Promise<Repo>} Newly created repo
   */
  createRepo: (repoName: string) => Promise<Repo>;

  /**
   * Deletes a repo
   *
   * @param {string} repoName Repo name
   */
  deleteRepo: (repoName: string) => Promise<void>;

  /**
   * List items in the repo at a given path and/or branch
   *
   * @param {string} repoName Repo name
   * @param {string|undefined} path Path within repo
   * @param {string|undefined} branch Branch of repo
   * @returns {Promise<RepoItem[]>} Repo items
   */
  listRepoItems: (repoName: string, path?: string, includeContent?: boolean, branch?: string) => Promise<RepoItem[]>;

  /**
   * Gets repo item in the repo at a given path and/or branch
   *
   * @param {string} repoName Repo name
   * @param {string|undefined} path Path within repo
   * @param {string|undefined} branch Branch of repo
   * @returns {Promise<RepoItem>} Repo item
   */
  getRepoItem: (repoName: string, path?: string, includeContent?: boolean, branch?: string) => Promise<RepoItem>;

  /**
   * Gets the latest commit for a repo at a given branch or default branch
   *
   * @param {string} repoName Repo name
   * @param {string|undefined} branch Branch of repo
   * @returns {Promise<string>} Commit SHA
   */
  latestCommit: (repoName: string, branch?: string) => Promise<string>;
}
