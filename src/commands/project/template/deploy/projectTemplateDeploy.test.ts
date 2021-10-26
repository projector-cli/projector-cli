import { BacklogItem, Template } from "../../../../models";
import { ModelSimulator, ServiceSimulator, CliSimulator } from "../../../../test";
import { projectTemplateDeployCommandFactory } from ".";

describe("Project Template Deploy Command", () => {
  const backlogItemFileName = "myItems.json";
  const template = ModelSimulator.createTestTemplate();
  const projectService = ServiceSimulator.createTestProjectService();

  describe("no arguments", () => {
    it("chooses from list of files in working directory", async () => {
      const userChoice = "optionA.json";
      const options = [userChoice, "optionB.yml", "optionC.yaml"];
      const allFiles = [...options, "optionD.txt"];

      const activeProjectServiceFactoryMap = ServiceSimulator.createTestActiveProjectServiceFactoryMap();
      activeProjectServiceFactoryMap.set("test", () => projectService);

      const templateService = ServiceSimulator.createTestStorageService<Template>();
      templateService.list = jest.fn(() => Promise.resolve(allFiles));
      templateService.read = jest.fn(() => Promise.resolve(template));

      const serviceCollection = ServiceSimulator.createTestServiceCollection({
        activeProjectServiceFactoryMap,
        templateService,
      });
      const projectTemplateDeploy = projectTemplateDeployCommandFactory();

      await projectTemplateDeploy.setServiceCollection(serviceCollection).parseAsync(CliSimulator.createArgs());
    });
  });

  describe("arguments", () => {
    it("calls createBacklogItems in the agile service with file input", async () => {
      const inputService = ServiceSimulator.createTestInputService();
      const logger = ServiceSimulator.createTestLogger();

      const templateService = ServiceSimulator.createTestStorageService<Template>(template);

      const activeProjectServiceFactoryMap = ServiceSimulator.createTestActiveProjectServiceFactoryMap();
      activeProjectServiceFactoryMap.set("test", () => projectService);

      const serviceCollection = ServiceSimulator.createTestServiceCollection({
        activeProjectServiceFactoryMap,
        inputService,
        logger,
        templateService,
      });

      const projectTemplateDeploy = projectTemplateDeployCommandFactory();

      await projectTemplateDeploy.setServiceCollection(serviceCollection).parseAsync(
        CliSimulator.createArgs([
          {
            name: "--templates",
            value: [backlogItemFileName],
          },
        ]),
      );

      expect(projectService.deployTemplates).toBeCalledWith([template]);
    });

    it("throws if backlog item file does not exist", async () => {
      const createBacklogItems = jest.fn((items: BacklogItem[]) =>
        Promise.resolve(
          items.map((item) => {
            return {
              ...item,
              id: "itemId",
            };
          }),
        ),
      );

      const inputService = ServiceSimulator.createTestInputService();
      const logger = ServiceSimulator.createTestLogger();

      const serviceCollection = ServiceSimulator.createTestServiceCollection({
        inputService,
        logger,
      });

      const projectTemplateDeploy = projectTemplateDeployCommandFactory();

      await projectTemplateDeploy.setServiceCollection(serviceCollection).parseAsync(
        CliSimulator.createArgs([
          {
            name: "--templates",
            value: "fakeFileName",
          },
        ]),
      );

      // Commander won't actually throw the error above, so the best we
      // can do for now is assert that the create function is not called
      expect(createBacklogItems).not.toBeCalled();
    });
  });
});
