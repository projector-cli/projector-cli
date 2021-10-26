import { generate } from "randomstring";
import * as coreInterfaces from "azure-devops-node-api/interfaces/CoreInterfaces";
import { Guid } from "guid-typescript";
import { ConfigKey, NumberConstants } from "../../../../constants";
import { BacklogItem, BacklogItemType, Project, Sprint } from "../../../../models";
import { ServiceSimulator } from "../../../../test";
import { Config, retryAsync } from "../../../../utils";
import { AgileServiceProvider } from "../../agileServiceProvider";
import { AzureDevOpsAgileService } from "./azureDevOpsAgileService";

describe("Azure DevOps Agile Service", () => {
  const inputService = ServiceSimulator.createTestInputService({
    confirmAnswer: true,
  });
  const logger = ServiceSimulator.createTestLogger();

  const service = new AzureDevOpsAgileService(
    {
      agileProvider: AgileServiceProvider.AzureDevOps,
      accessToken: Config.getValue(ConfigKey.TestAzDOAccessToken),
      baseUrl: Config.getValue(ConfigKey.TestAzDOBaseUrl),
      projectName: Config.getValue(ConfigKey.TestAzDOProjectName),
    },
    logger,
  );

  it("can create, get, and delete a project", async () => {
    const projectName = `test-project_${Guid.create().toString()}`;
    const projectDescription = "this is an automated test project";
    const templateTypeId = Config.getValue(ConfigKey.AgileDefaultProjectTemplateId);
    const sourceControlType = Config.getValue(ConfigKey.AgileDefaultSourceControl);

    const testProject: Project = {
      name: projectName,
      description: projectDescription,
      visibility: coreInterfaces.ProjectVisibility.Organization,
      capabilities: {
        processTemplate: {
          templateTypeId: templateTypeId,
        },
        versioncontrol: {
          sourceControlType: sourceControlType,
        },
      },
    };

    const createdProject = await service.createProject(testProject);

    // Get created project
    const fetchedProject = await retryAsync(() => service.getProject(createdProject?.name), 10, 2);
    if (!fetchedProject) {
      throw Error("Cannot get created project");
    }
    expect(fetchedProject.name).toEqual(testProject.name);
    expect(fetchedProject.description).toEqual(testProject.description);
    expect(fetchedProject.visibility).toEqual(testProject.visibility);
    expect(fetchedProject.capabilities).toEqual(testProject.capabilities);

    // Clean up test project
    if (!createdProject.id) {
      throw Error("Cannot assign project ID");
    }

    await service.deleteProject(createdProject);
  }, 60000);

  it("can create, get and delete sprints", async () => {
    const start = new Date();
    start.setFullYear(2021);
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(start.getTime() + NumberConstants.millisecondsInADay * 7);
    const initialSprints: Sprint[] = [1, 2, 3].map((num: number) => {
      return {
        name: `Sprint ${num} ${generate({ length: 10, charset: "alphanumeric" })}`,
        startDate: start,
        finishDate: end,
      };
    });

    const sprints = await service.createSprints(initialSprints);

    expect(inputService.confirmAction).toBeCalled();

    expect(sprints).toHaveLength(initialSprints.length);

    for (const sprint of sprints) {
      const { id, name, startDate, finishDate } = sprint;

      expect(id).toBeDefined();
      expect(name).toBeDefined();
      expect(startDate).toBeDefined();
      expect(finishDate).toBeDefined();

      if (!id) {
        throw new Error("ID should be defined");
      }

      // Get created sprint
      const fetchedSprint = await retryAsync(() => service.getSprint(id), 10, 2);
      expect(fetchedSprint.name).toEqual(name);
      expect(fetchedSprint.id).toEqual(id);
      expect(fetchedSprint.startDate).toEqual(startDate);
      expect(fetchedSprint.finishDate).toEqual(finishDate);

      // Clean up test sprint
      await service.deleteSprint(id);

      // Sprint ID should not exist anymore
      await expect(service.getSprint(id)).rejects.toThrow();
    }
  }, 60000);

  it("can create, get and delete hierarchical work items", async () => {
    const initialBacklogItem: BacklogItem = {
      name: "My Sample Story with Tasks",
      type: BacklogItemType.Story,
      description: "This is my sample story",
      acceptanceCriteria: ["This should work", "This whould work well"],
      children: [
        {
          name: "My Task",
          type: BacklogItemType.Task,
        },
      ],
    };

    const createdBacklogItems = await service.createBacklogItems([initialBacklogItem]);

    expect(createdBacklogItems).toHaveLength(1);

    const createdBacklogItem = createdBacklogItems[0];
    expect(createdBacklogItem).toEqual({
      ...initialBacklogItem,
      id: expect.any(String),
      url: expect.any(String),
      description: expect.stringMatching(new RegExp(`.*${initialBacklogItem.description}.*`)),
      acceptanceCriteria: expect.stringMatching(
        new RegExp(`.*${initialBacklogItem.acceptanceCriteria![0]}.*${initialBacklogItem.acceptanceCriteria![1]}.*`),
      ),
      children: [
        {
          ...initialBacklogItem.children![0],
          id: expect.any(String),
          url: expect.any(String),
        },
      ],
    });

    // Retrieve backlog item with same ID
    const retrievedBacklogItems = await service.getBacklogItems([createdBacklogItem.id!]);

    // Should be the same as the created backlog item
    expect(retrievedBacklogItems).toEqual(createdBacklogItems);

    // Clean up created backlog item
    await service.deleteBacklogItems([createdBacklogItem.id!]);

    // Backlog item should no longer exist
    await expect(service.getBacklogItems([createdBacklogItem.id!])).rejects.toThrow();
  }, 60000);
});
