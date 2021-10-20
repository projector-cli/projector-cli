import { AgileService, InputService, StorageService } from "..";
import { Template, Logger, Sprint } from "../../models";
import { ServiceSimulator } from "../../test";
import { RepositoryProjectService } from "./repositoryProjectService";

describe("Project Service", () => {
  const selectedTemplateName = "selected";
  const selectedTemplateFileName = "selected.json";

  const unselectedTemplateName = "unselected";
  const unselectedTemplateFileName = "unselected.json";

  const selectedTemplateItem: Template = {
    name: selectedTemplateName,
    description: "description",
    items: [],
  };

  const unselectedTemplateItem: Template = {
    name: unselectedTemplateName,
    description: "description",
    items: [],
  };

  const sprints: Sprint[] = [
    {
      name: "test",
    },
  ];

  let templateService: StorageService<Template>;
  let inputService: InputService;
  let agileService: AgileService;
  let logger: Logger;

  beforeEach(() => {
    templateService = ServiceSimulator.createTestStorageService<Template>();
    templateService.list = jest.fn(() => Promise.resolve([selectedTemplateFileName, unselectedTemplateFileName]));
    templateService.read = jest.fn((template) =>
      template === selectedTemplateName
        ? Promise.resolve(selectedTemplateItem)
        : Promise.resolve(unselectedTemplateItem),
    );

    inputService = ServiceSimulator.createTestInputService();
    logger = ServiceSimulator.createTestLogger();

    agileService = ServiceSimulator.createTestAgileService({}, inputService, logger);
    agileService.createSprints = jest.fn((requested) =>
      requested == [] ? Promise.resolve(sprints) : Promise.resolve([]),
    );
  });

  it("does not create sprints without a configuration", async () => {
    const projectService = new RepositoryProjectService(agileService, templateService, logger);
    expect(await projectService.createSprints([])).toEqual([]);
  });

  it("creates sprints", async () => {
    const projectService = new RepositoryProjectService(agileService, templateService, logger);
    expect(await projectService.createSprints(sprints)).toBeTruthy();
  });

  it("fails to deploy without any templates", async () => {
    const projectService = new RepositoryProjectService(agileService, templateService, logger);
    expect((await projectService.deployTemplates({})).length).toBe(0);
  });

  it("deploys given templates", async () => {
    const projectService = new RepositoryProjectService(agileService, templateService, logger);
    expect((await projectService.deployTemplates({ templates: [selectedTemplateName] })).length).toBe(1);
  });

  it("deploys all templates", async () => {
    const projectService = new RepositoryProjectService(agileService, templateService, logger);
    expect((await projectService.deployTemplates({ all: true })).length).toBe(2);
  });
});
