import { getPersonalAccessTokenHandler } from "azure-devops-node-api";
import { CoreApi } from "azure-devops-node-api/CoreApi";
import { ProjectVisibility, TeamContext, TeamProject } from "azure-devops-node-api/interfaces/CoreInterfaces";
import {
  TreeStructureGroup,
  WorkItem,
  WorkItemExpand,
  WorkItemBatchGetRequest,
  Wiql,
} from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";
import { WorkApi } from "azure-devops-node-api/WorkApi";
import { WorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi";
import { AgileService } from "../..";
import { ConfigKey, NumberConstants } from "../../../../constants";
import { AgileProviderOptions, BacklogItem, Logger, Project, Sprint } from "../../../../models";
import { AzureDevOpsUtils, Config, retryAsync } from "../../../../utils";
import { AzureDevOpsFieldName } from "./azureDevOpsFieldName";
import { AzureDevOpsWorkItemType } from "./azureDevOpsWorkItemType";

export class AzureDevOpsAgileService implements AgileService {
  /* Name of Azure DevOps Project */
  private projectName: string;
  /* Work Item Tracking API */
  private workItemTracking: WorkItemTrackingApi;
  /* Work API */
  private workApi: WorkApi;
  /* Core API */
  private coreApi: CoreApi;
  /* Team Context */
  private teamContext?: TeamContext;
  private logger: Logger;

  constructor(options: AgileProviderOptions, logger: Logger) {
    const { baseUrl, projectName, accessToken } = options;

    if (!projectName) {
      throw new Error("Need to provide a project name to use Azure DevOps");
    }

    this.projectName = projectName;

    // Instantiate auth handler to be used in API clients
    const authHandler = getPersonalAccessTokenHandler(accessToken);

    // Instantiate various API clients
    this.coreApi = new CoreApi(baseUrl, [authHandler]);
    this.workItemTracking = new WorkItemTrackingApi(baseUrl, [authHandler]);
    this.workApi = new WorkApi(baseUrl, [authHandler]);

    this.logger = logger;
  }

  // Projects
  createProject = async (project: Project): Promise<Project> => {
    const teamProject = this.convertToTeamProject(project);
    await this.coreApi.queueCreateProject(teamProject);
    // Poll until project exists
    let createdProject: TeamProject;
    let numLoops = 0;
    while (numLoops < NumberConstants.maxLoopTries) {
      if (!teamProject.name) {
        throw Error("Error converting to TeamProject");
      }
      createdProject = await this.coreApi.getProject(teamProject.name);
      numLoops += 1;
      if (createdProject) {
        return this.convertToProject(createdProject);
      }
    }
    throw new Error("Project creation timed out");
  };

  getProject = async (name: string): Promise<Project | null> => {
    const teamProject = await this.coreApi.getProject(name);
    if (!teamProject) {
      throw Error("Could not find project");
    }
    return this.convertToProject(teamProject);
  };

  deleteProject = async (project: Project): Promise<boolean> => {
    let numLoops = 0;
    if (!project.id) {
      throw Error("Project id undefined. Cannot delete project");
    }

    await this.coreApi.queueDeleteProject(project.id);

    while (numLoops < NumberConstants.maxLoopTries) {
      const deletedProject = await this.coreApi.getProject(project.name);
      numLoops += 1;
      if (!deletedProject) {
        return true;
      }
    }
    throw new Error("Project deletion timed out");
  };

  convertToProject = (teamProject: TeamProject): Project => {
    return {
      id: teamProject.id || "",
      name: teamProject.name || "",
      description: teamProject.description || "",
      visibility: teamProject.visibility || ProjectVisibility.Organization,
      capabilities: {
        processTemplate: {
          templateTypeId:
            teamProject.capabilities?.processTemplate?.templateTypeId ||
            Config.getValue(ConfigKey.AgileDefaultProjectTemplateId),
        },
        versioncontrol: {
          sourceControlType:
            teamProject.capabilities?.versioncontrol?.sourceControlType ||
            Config.getValue(ConfigKey.AgileDefaultSourceControl),
        },
      },
    };
  };

  convertToTeamProject = (project: Project): TeamProject => {
    return {
      name: project.name || "",
      description: project.description || "",
      visibility: project.visibility || ProjectVisibility.Unchanged,
      capabilities: {
        processTemplate: {
          templateTypeId: project.capabilities.processTemplate?.templateTypeId || "",
        },
        versioncontrol: {
          sourceControlType: project.capabilities.versioncontrol.sourceControlType,
        },
      },
    };
  };

  // Backlog Items

  getBacklogItems = async (ids?: string[]): Promise<BacklogItem[]> => {
    if (ids) {
      const workItems = await this.workItemTracking.getWorkItems(
        ids.map((id) => +id),
        undefined,
        undefined,
        WorkItemExpand.Relations,
      );
      return Promise.all(workItems.map((workItem: WorkItem) => this.mapWorkItem(workItem, true)));
    }

    const workItemQuery: Wiql = {
      query: "SELECT ID FROM WORKITEMS",
    };
    const queryResult = await this.workItemTracking.queryByWiql(workItemQuery);
    const workItemIds = queryResult.workItems?.map((workItem) => {
      return workItem.id;
    });

    const request: WorkItemBatchGetRequest = {
      ids: workItemIds?.filter((id): id is number => !!id),
    };

    const workItems = await this.workItemTracking.getWorkItemsBatch(request);

    return Promise.all(workItems.map((workItem) => this.mapWorkItem(workItem)));
  };

  createBacklogItems = async (items: BacklogItem[], parent?: BacklogItem): Promise<BacklogItem[]> => {
    const backlogItems: BacklogItem[] = [];
    for (const item of items) {
      // Make AzDO API call
      const workItem = await this.workItemTracking.createWorkItem(
        undefined,
        AzureDevOpsUtils.createPatchDocument(item, parent?.url),
        this.projectName,
        AzureDevOpsUtils.getWorkItemType(item.type),
      );

      // Map work item from AzDO model to BacklogItem
      const createdBacklogItem = await this.mapWorkItem(workItem);

      // Create children if applicable
      if (item.children) {
        createdBacklogItem.children = await this.createBacklogItems(item.children, createdBacklogItem);
      }

      // Add created backlog item to list
      backlogItems.push(createdBacklogItem);
    }
    return backlogItems;
  };

  deleteBacklogItems = async (ids: string[]): Promise<void> => {
    await Promise.all(ids.map((id) => this.workItemTracking.deleteWorkItem(+id, this.projectName)));
  };

  // Sprints

  getSprint = async (id: string): Promise<Sprint> => {
    const teamContext = await this.getTeamContext();
    const teamIteration = await retryAsync(() => this.workApi.getTeamIteration(teamContext, id));

    if (!teamIteration) {
      throw new Error(`Could not retrieve sprint ${id}`);
    }

    const { name, attributes } = teamIteration;

    return {
      id,
      name: name || "",
      startDate: attributes?.startDate,
      finishDate: attributes?.finishDate,
    };
  };

  createSprints = async (sprints: Sprint[]): Promise<Sprint[]> => {
    const teamContext = await this.getTeamContext();

    this.logger.log(`Creating ${sprints.length} sprints`);

    const createdSprints: Sprint[] = [];

    for (const sprint of sprints) {
      createdSprints.push(await this.createProviderSprint(sprint, teamContext));
    }
    return createdSprints;
  };

  deleteSprint = async (id: string): Promise<void> => {
    const teamContext = await this.getTeamContext();
    await this.workApi.deleteTeamIteration(teamContext, id);
  };

  // Private functions

  private async createProviderSprint(sprint: Sprint, teamContext: TeamContext): Promise<Sprint> {
    const { name, startDate, finishDate } = sprint;

    // Creates classification node and returns identifier required for sprint ID
    const identifier = await this.createOrUpdateClassificationNode(sprint, teamContext);

    // Create new iteration
    const result = await this.workApi.postTeamIteration(
      {
        id: identifier,
        name,
        attributes: {
          startDate,
          finishDate,
        },
      },
      teamContext,
    );

    // Assign generated ID from Azure DevOps to sprint
    sprint.id = result.id;
    this.logger.log(`Sprint '${name}' created`);
    return sprint;
  }

  private async createOrUpdateClassificationNode(sprint: Sprint, teamContext: TeamContext): Promise<string> {
    const { name, startDate, finishDate } = sprint;
    if (name === undefined) {
      throw new Error("Sprint name undefined.");
    }

    await this.deleteNodeAndIterationIfExists(name, teamContext);

    const { identifier } = await this.workItemTracking.createOrUpdateClassificationNode(
      {
        name,
        attributes: {
          startDate: startDate?.toISOString(),
          finishDate: finishDate?.toISOString(),
        },
      },
      this.projectName,
      TreeStructureGroup.Iterations,
    );

    if (!identifier) {
      throw new Error(`Was not able to retrieve identifier for ${this.projectName}`);
    }
    return identifier;
  }

  private async deleteNodeAndIterationIfExists(name: string, teamContext: TeamContext) {
    const node = await this.workItemTracking.getClassificationNode(
      this.projectName,
      TreeStructureGroup.Iterations,
      name,
    );
    if (node && node.identifier) {
      await this.workApi.deleteTeamIteration(teamContext, node.identifier);
      await this.workItemTracking.deleteClassificationNode(this.projectName, TreeStructureGroup.Iterations, name);
    }
  }

  private async getTeamContext(): Promise<TeamContext> {
    if (this.teamContext) {
      return this.teamContext;
    }
    const { name, id, defaultTeam } = await this.coreApi.getProject(this.projectName);

    this.teamContext = {
      project: name,
      projectId: id,
      team: defaultTeam?.name,
      teamId: defaultTeam?.id,
    };
    return this.teamContext;
  }

  private async mapWorkItem(workItem: WorkItem, includeChildren = false): Promise<BacklogItem> {
    const { id, fields, url } = workItem;
    if (!id || !fields) {
      throw new Error(`Invalid work item: ${JSON.stringify(workItem)}`);
    }

    const workItemType: AzureDevOpsWorkItemType = fields[AzureDevOpsFieldName.workItemType];

    return {
      id: id.toString(),
      name: fields[AzureDevOpsFieldName.title],
      description: fields[AzureDevOpsFieldName.description],
      acceptanceCriteria: fields[AzureDevOpsFieldName.acceptanceCriteria],
      type: AzureDevOpsUtils.getBacklogItemType(workItemType),
      children: includeChildren ? await this.getBacklogItemChildren(workItem) : undefined,
      url,
    };
  }

  private async getBacklogItemChildren(workItem: WorkItem): Promise<BacklogItem[] | undefined> {
    const { relations } = workItem;
    if (relations) {
      const childIds: string[] = [];
      for (const relation of relations) {
        const { attributes, url } = relation;
        if (!attributes || attributes.name !== "Child") {
          continue;
        }
        const id = url?.substr(url.lastIndexOf("/") + 1);
        if (id) {
          childIds.push(id);
        }
      }
      if (childIds.length) {
        return this.getBacklogItems(childIds);
      }
    }
  }
}
