import { BacklogItemType, Template } from "../../../../models";
import { ServiceSimulator, CliSimulator } from "../../../../test";
import { projectTemplateImportCommandFactory } from "./projectTemplateImport";

describe("Agile Work Import Command", () => {
  it("calls set in the content service with cli args", async () => {
    const getBacklogItems = jest.fn((ids?: string[]) =>
      Promise.resolve([
        {
          name: "As a test, I can verify import functionality",
          type: BacklogItemType.Story,
          id: ids ? ids[0] || "0" : "0",
        },
        {
          name: "As a dev, I can import packaged sprints",
          type: BacklogItemType.Task,
          id: ids ? ids[1] || "1" : "1",
        },
      ]),
    );

    const inputService = ServiceSimulator.createTestInputService({
      multiChoiceAnswer: "",
    });
    const logger = ServiceSimulator.createTestLogger();
    const agileService = ServiceSimulator.createTestAgileService({ getBacklogItems }, inputService, logger);
    const templateService = ServiceSimulator.createTestStorageService<Template>();

    const serviceCollection = ServiceSimulator.createTestServiceCollection({
      agileService,
      templateService,
      inputService,
      logger,
    });
    const projectTemplateImport = projectTemplateImportCommandFactory();

    await projectTemplateImport.setServiceCollection(serviceCollection).parseAsync(
      CliSimulator.createArgs([
        {
          name: "--directory",
          value: "foo",
        },
        {
          name: "--format",
          value: "yaml",
        },
      ]),
    );

    // Log header and one line for each backlog item
    expect(logger.logHeader).toBeCalledTimes(1);
    expect(templateService.write).toBeCalled();
  });
});
