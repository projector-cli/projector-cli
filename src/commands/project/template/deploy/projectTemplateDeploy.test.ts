import { BacklogItem, Template } from "../../../../models";
import { ModelSimulator, ServiceSimulator, CliSimulator } from "../../../../test";
import { projectTemplateDeployCommandFactory } from ".";
import { AgileService } from "../../../../services";

describe("Project Template Deploy Command", () => {
  const backlogItemFileName = "myItems.json";
  const template = ModelSimulator.createTestTemplate();

  describe("no arguments", () => {
    it("chooses from list of files in working directory", async () => {
      const userChoice = "optionA.json";
      const options = [userChoice, "optionB.yml", "optionC.yaml"];
      const allFiles = [...options, "optionD.txt"];

      const inputService = ServiceSimulator.createTestInputService({
        multiChoiceAnswer: userChoice,
      });
      inputService.multiChoiceQuestion = jest.fn(async () => {
        return "";
      });

      const templateService = ServiceSimulator.createTestStorageService<Template>(
        undefined,
        undefined,
        jest.fn(() => {
          return allFiles;
        }),
      );
      const serviceCollection = ServiceSimulator.createTestServiceCollection({
        templateService,
        inputService,
      });
      const projectTemplateDeploy = projectTemplateDeployCommandFactory();

      await projectTemplateDeploy.setServiceCollection(serviceCollection).parseAsync(CliSimulator.createArgs());
      expect(inputService.multiChoiceQuestion).toHaveBeenCalled();

      expect(inputService.multiChoiceQuestion).toHaveBeenCalledWith(
        "What is the name of the file containing your backlog items?",
        options.concat("other"),
      );
    });
  });

  describe("arguments", () => {
    it("calls createBacklogItems in the agile service with file input", async () => {
      const inputService = ServiceSimulator.createTestInputService();
      const logger = ServiceSimulator.createTestLogger();
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

      const agileService: AgileService = ServiceSimulator.createTestAgileService(
        {
          createBacklogItems,
        },
        inputService,
        logger,
      );

      const templateService = ServiceSimulator.createTestStorageService<Template>(template);

      const serviceCollection = ServiceSimulator.createTestServiceCollection({
        templateService,
        agileService,
        logger,
      });

      const projectTemplateDeploy = projectTemplateDeployCommandFactory();

      await projectTemplateDeploy.setServiceCollection(serviceCollection).parseAsync(
        CliSimulator.createAgileArgs([
          {
            name: "--file",
            value: backlogItemFileName,
          },
        ]),
      );

      expect(createBacklogItems).toBeCalledWith(template.items);

      const getChildCount = (item: BacklogItem): number => {
        const { children } = item;

        let count = 0;

        if (children) {
          count += children.length;
          for (const child of children) {
            count += getChildCount(child);
          }
        }

        return count;
      };

      let childCount = 0;

      template.items.forEach((item: BacklogItem) => {
        childCount += getChildCount(item);
      });

      // Log header and one line for each backlog item
      expect(logger.log).toBeCalledTimes(template.items.length + childCount);
      expect(logger.logHeader).toBeCalledTimes(1);
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
      const agileService: AgileService = ServiceSimulator.createTestAgileService(
        { createBacklogItems },
        inputService,
        logger,
      );

      const serviceCollection = ServiceSimulator.createTestServiceCollection({
        inputService,
        logger,
        agileService,
      });

      const projectTemplateDeploy = projectTemplateDeployCommandFactory();

      await projectTemplateDeploy.setServiceCollection(serviceCollection).parseAsync(
        CliSimulator.createAgileArgs([
          {
            name: "--file",
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
