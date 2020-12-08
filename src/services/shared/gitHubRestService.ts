import { Octokit } from "@octokit/rest";
import { GitHubIssue, GitHubLabel, GitHubMilestone, ServiceProviderOptions } from "../../models";
import { RegexExtractor, Utils } from "../../utils";

export interface GitHubRestOptions {
  owner: string;
  repo: string;
  baseUrl?: string;
}

export class GitHubRestService {
  private options: GitHubRestOptions;
  private octokit: Octokit;

  public constructor(options: ServiceProviderOptions) {
    const { accessToken } = options;
    const { repo, owner } = RegexExtractor.getGitHubInfo(options);

    this.options = {
      owner,
      // Required to use with GitHub enterprise https://octokit.github.io/rest.js/v18
      baseUrl: "https://api.github.com",
      repo,
    };

    this.octokit = new Octokit({
      userAgent: "projector",
      auth: accessToken,
    });
  }

  public async getOrCreateGitHubLabel(name: string, description?: string, color?: string): Promise<GitHubLabel> {
    try {
      const response = await this.octokit.issues.getLabel({
        ...this.options,
        name: name,
      });
      return response.data;
    } catch (err) {
      // Label does not yet exist
      if (err.status === 404) {
        const response = await this.octokit.issues.createLabel({
          ...this.options,
          name,
          color: color || Utils.randomColor(),
          description,
        });
        return response.data;
      } else {
        throw err;
      }
    }
  }

  public async getOrCreateGitHubProject(projectName: string, description?: string): Promise<number> {
    const repoProjectsResponse = await this.octokit.projects.listForRepo({
      ...this.options,
    });

    const project = repoProjectsResponse.data.find((repo) => repo.name === projectName);
    if (project) {
      return project.id;
    }

    const createProjectResponse = await this.octokit.projects.createForRepo({
      ...this.options,
      name: projectName,
      body: description,
    });

    return createProjectResponse.data.id;
  }

  public async getOrCreateProjectColumn(projectId: number, name: string): Promise<number> {
    const columnsListResponse = await this.octokit.projects.listColumns({
      project_id: projectId,
    });

    const column = columnsListResponse.data.find((col) => col.name === name);
    if (column) {
      return column.id;
    }

    const createdCol = await this.octokit.projects.createColumn({
      project_id: projectId,
      name,
    });
    return createdCol.data.id;
  }

  public async addIssueToProjectColumn(columnId: number, dbId: number): Promise<void> {
    await this.octokit.projects.createCard({
      column_id: columnId,
      content_id: dbId,
      content_type: "Issue",
    });
  }

  public async getGitHubIssue(id: number): Promise<GitHubIssue> {
    const response = await this.octokit.issues.get({
      ...this.options,
      issue_number: id,
    });

    return response.data;
  }

  public async getGithubIssues(): Promise<GitHubIssue[]> {
    const response = await this.octokit.issues.list({
      ...this.options,
    });
    return response.data;
  }

  public async createGitHubIssue(title: string, body: string, label?: GitHubLabel): Promise<GitHubIssue> {
    const response = await this.octokit.issues.create({
      ...this.options,
      title,
      body,
      labels: label ? [label] : [],
    });

    return response.data;
  }

  public async closeGitHubIssue(id: number): Promise<void> {
    await this.octokit.issues.update({
      ...this.options,
      issue_number: id,
      state: "closed",
    });
  }

  public async getMilestone(id: number): Promise<GitHubMilestone> {
    const response = await this.octokit.issues.getMilestone({
      ...this.options,
      milestone_number: id,
    });
    return response.data;
  }

  public async createOrUpdateMilestone(name: string, dueDate?: Date): Promise<GitHubMilestone> {
    // TODO Perf improvement here - shouldn't need to make request every single time
    const response = await this.octokit.issues.listMilestones({
      ...this.options,
    });

    const milestone = response.data.find((m) => m.title === name);
    if (milestone) {
      const updatedResponse = await this.octokit.issues.updateMilestone({
        ...this.options,
        milestone_number: milestone.number,
        due_on: dueDate?.toISOString(),
      });

      return updatedResponse.data;
    } else {
      const createdMilestoneResponse = await this.octokit.issues.createMilestone({
        ...this.options,
        title: name,
        due_on: dueDate?.toISOString(),
      });

      return createdMilestoneResponse.data;
    }
  }

  public async deleteMilestone(milestoneNumber: number): Promise<void> {
    await this.octokit.issues.deleteMilestone({
      ...this.options,
      milestone_number: milestoneNumber,
    });
  }
}
