import { Project, BacklogItem, Sprint } from "../../models";

export interface AgileService {
  // Projects
  createProject: (project: Project) => Promise<Project>;

  getProject: (name: string) => Promise<Project | null>;

  deleteProject: (project: Project) => Promise<boolean>;

  // Backlog Items

  /**
   * Get backlog items by ID from agile provider
   *
   * @param {string[]} ids List of backlog item IDs
   * @returns {BacklogItem[]} List of backlog items corresponding to IDs
   */
  getBacklogItems: (ids?: string[]) => Promise<BacklogItem[]>;

  /**
   * Create backlog items with agile provider
   *
   * @param {BacklogItem[]} items List of backlog items to create
   * @param {BacklogItem|undefined} parent Parent backlog item
   * @returns {BacklogItem[]} Newly created backlog items
   */
  createBacklogItems: (items: BacklogItem[], parent?: BacklogItem) => Promise<BacklogItem[]>;

  /**
   * Delete backlog items from agile provider
   *
   * @param {string[]} ids List of backlog item IDs to delete
   */
  deleteBacklogItems: (ids: string[]) => Promise<void>;

  // Sprints

  /**
   * Get a sprint by ID
   *
   * @param {string} id Sprint ID
   */
  getSprint: (id: string) => Promise<Sprint>;

  /**
   * Create sprints with Agile provider
   *
   * @param {Sprint[]} sprints Sprints to create
   * @returns {Promise<Sprint[]>} Sprints
   */
  createSprints: (sprints: Sprint[]) => Promise<Sprint[]>;

  /**
   * Delete a sprint
   *
   * @param {string} id Sprint ID
   */
  deleteSprint: (id: string) => Promise<void>;
}
