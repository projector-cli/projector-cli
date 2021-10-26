import { ConfigKey } from "../../../../constants";
import {
  AgileProviderOptions,
  BacklogItem,
  BacklogItemType,
  GitHubIssue,
  GitHubLabel,
  GitHubMilestone,
  Logger,
  Project,
  Sprint,
} from "../../../../models";
import { Config } from "../../../../utils";
import { GitHubRestService } from "../../../shared";
import { AgileService } from "../..";

interface DbIdProp {
  db_id: number;
}

/**
 * Performing agile-related business logic on GitHub platform
 */
export class GitHubAgileService implements AgileService {
  private github: GitHubRestService;
  private logger: Logger;

  public constructor(options: AgileProviderOptions, logger: Logger) {
    this.github = new GitHubRestService(options);
    this.logger = logger;
  }

  // Backlog Items

  getBacklogItems = async (ids?: string[]): Promise<BacklogItem[]> => {
    if (ids) {
      return Promise.all(ids.map((id: string) => this.getBacklogItem(+id)));
    }
    const issues = await this.github.getGithubIssues();
    return Promise.all(issues.map((issue) => this.mapGitHubIssueToBacklogItem(issue)));
  };

  createBacklogItems = (items: BacklogItem[]): Promise<BacklogItem[]> => {
    return Promise.all(items.map((item: BacklogItem) => this.createBacklogItem(item)));
  };

  deleteBacklogItems = async (): Promise<void> => {
    throw new Error("Deleting issues is not supported by GitHub");
  };

  private async getBacklogItem(id: number): Promise<BacklogItem> {
    const issue = await this.github.getGitHubIssue(id);
    return this.mapGitHubIssueToBacklogItem(issue);
  }

  /**
   * Create a backlog item. Not all are going to be issues.
   *
   * Epic = Label
   * Feature = Project
   * Story, Task, Bug = Issue
   *
   * If tasks/bugs are children of a story, they will be included within the body of
   * the story's issue.
   *
   * @param {BacklogItem} backlogItem Backlog item to create
   * @param {GitHubLabel} label Label associated with backlog item
   * @returns {Promise<BacklogItem>} Newly created Backlog Item
   */
  private async createBacklogItem(backlogItem: BacklogItem, label?: GitHubLabel): Promise<BacklogItem> {
    switch (backlogItem.type) {
      case BacklogItemType.Epic:
        return this.createGitHubEpic(backlogItem);
      case BacklogItemType.Feature:
        return this.createGitHubFeature(backlogItem, label);
      case BacklogItemType.Story:
      case BacklogItemType.Task:
      case BacklogItemType.Bug:
        return this.createGitHubIssue(backlogItem, label);
    }
  }

  /**
   * GitHub has no concept of "epics." We are using "labels" as a way of grouping
   * issues in an epic-category.
   *
   * @param {BacklogItem} backlogItem Epic to create
   * @returns {Promise<BacklogItem>} Newly created "epic" (GitHub label)
   */
  private async createGitHubEpic(backlogItem: BacklogItem): Promise<BacklogItem> {
    this.logger.log(`GitHub doesn't natively have a concept of "epics".
    The closest parity is to create a "label" which will allow you to filter on all child issues`);
    const { name, description, children } = backlogItem;

    const labelName = this.createLabelName(name);
    const label = await this.github.getOrCreateGitHubLabel(labelName, description);

    return {
      id: label.id.toString(),
      name: labelName,
      type: BacklogItemType.Epic,
      children: await this.createChildren(children, label),
      description,
    };
  }

  private createLabelName(epicName: string): string {
    return epicName.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
  }

  /**
   * GitHub has no concept of "features." We are using "projects" as a way of grouping
   * issues in a feature-category. This seems to be a common practice among large
   * open-source projects on GitHub.
   *
   * @param {BacklogItem} backlogItem Feature-type backlog item
   * @param {GitHubLabel|undefined} label GitHub Label
   * @returns {Promise<BacklogItem>} Newly created "feature" (GitHub project)
   */
  private async createGitHubFeature(backlogItem: BacklogItem, label?: GitHubLabel): Promise<BacklogItem> {
    this.logger.log(`GitHub doesn't natively have a concept of "features".
    The closest parity is to create a "project" which will provide a view for all child issues`);

    const { name, description, children } = backlogItem;

    const projectId = await this.github.getOrCreateGitHubProject(name, description);
    const toDoColumnId = await this.createColumns(projectId);
    const createdChildren = await this.createChildren(children, label);
    await this.assignChildrenToColumn(createdChildren, toDoColumnId);

    return {
      id: projectId.toString(),
      name,
      description,
      type: BacklogItemType.Feature,
      children: createdChildren,
    };
  }

  private async createColumns(projectId: number): Promise<number> {
    const columns: string[] = Config.getValue(ConfigKey.AgileBoardColumns);
    const firstColumn = Config.getValue(ConfigKey.AgileBoardFirstColumn);

    let firstColumnId: number | undefined = undefined;

    for (const col of columns) {
      const createdCol = await this.github.getOrCreateProjectColumn(projectId, col);

      if (col === firstColumn) {
        firstColumnId = createdCol;
      }
    }

    return firstColumnId!;
  }

  private async createChildren(children?: BacklogItem[], label?: GitHubLabel): Promise<BacklogItem[] | undefined> {
    return children
      ? Promise.all(children.map((child: BacklogItem) => this.createBacklogItem(child, label)))
      : undefined;
  }

  private async assignChildrenToColumn(children?: BacklogItem[], columnId?: number): Promise<void> {
    if (children && columnId) {
      for (const child of children) {
        const prop = child.metadata as DbIdProp;
        if (prop) await this.github.addIssueToProjectColumn(columnId, prop.db_id);
      }
    }
  }

  private async createGitHubIssue(backlogItem: BacklogItem, label?: GitHubLabel): Promise<BacklogItem> {
    const { name, description, acceptanceCriteria, children } = backlogItem;
    const body = this.createIssueBody(description, acceptanceCriteria, children);

    // Create issue in GitHub
    const issue = await this.github.createGitHubIssue(name, body, label);
    // Create backlog item from issue
    return this.mapGitHubIssueToBacklogItem(issue);
  }

  private mapGitHubIssueToBacklogItem(issue: GitHubIssue): BacklogItem {
    const { title, number, node_id, body } = issue;

    const nodeIdBuffer = Buffer.from(node_id!, "base64");
    const nodeIdDecoded = nodeIdBuffer.toString("ascii").toLowerCase();
    const db_id = +nodeIdDecoded.substring(nodeIdDecoded.indexOf("issue") + 5);

    return {
      name: title,
      type: BacklogItemType.Story,
      id: `${number}`,
      description: body,
      metadata: {
        node_id,
        db_id,
      },
    };
  }

  private createIssueBody(description?: string, acceptanceCriteria?: string[], children?: BacklogItem[]): string {
    return [
      "## Description",
      description,
      "## Acceptance Criteria",
      this.stringifyAcceptanceCriteria(acceptanceCriteria),
      "## Tasks",
      this.stringifyChildTasks(children),
    ].join("\n");
  }

  private stringifyAcceptanceCriteria(acceptanceCriteria?: string[]): string {
    return acceptanceCriteria ? this.createChecklist(acceptanceCriteria) : "";
  }

  private stringifyChildTasks(children?: BacklogItem[]): string {
    return children ? this.createChecklist(children.map((child: BacklogItem) => child.name)) : "";
  }

  private createChecklist(items: string[]): string {
    return items ? items.map((item: string) => `- [ ] ${item}`).join("\n") : "";
  }

  // Project

  createProject = (): Promise<Project> => {
    throw new Error("Not yet implemented");
  };

  getProject = (): Promise<Project | null> => {
    throw new Error("Not yet implemented");
  };

  deleteProject = (): Promise<boolean> => {
    throw new Error("Not yet implemented");
  };

  // Sprints

  getSprint = async (id: string): Promise<Sprint> => {
    const milestone = await this.github.getMilestone(+id);
    return this.mapMilestoneToSprint(milestone);
  };

  createSprints = (sprints: Sprint[]): Promise<Sprint[]> => {
    return Promise.all(sprints.map((sprint: Sprint) => this.createSprint(sprint)));
  };

  deleteSprint = async (id: string): Promise<void> => {
    return this.github.deleteMilestone(+id);
  };

  private async createSprint(sprint: Sprint): Promise<Sprint> {
    const { name, finishDate } = sprint;
    const milestone = await this.github.createOrUpdateMilestone(name, finishDate);
    return this.mapMilestoneToSprint(milestone);
  }

  private mapMilestoneToSprint(milestone: GitHubMilestone): Sprint {
    const { id, title, due_on, number } = milestone;

    return {
      name: title,
      id: id.toString(),
      finishDate: due_on ? new Date(Date.parse(due_on)) : undefined,
      metadata: {
        milestoneNumber: number,
      },
    };
  }
}
