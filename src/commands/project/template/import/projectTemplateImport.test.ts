import { Template } from "../../../../models";
import { ServiceSimulator, CliSimulator } from "../../../../test";
import { projectTemplateImportCommandFactory } from "./projectTemplateImport";

describe("Agile Work Import Command", () => {
  it("calls set in the content service with cli args", async () => {
    const templates: Template[] = [{ name: "", description: "", items: [] }];

    const playbookService = ServiceSimulator.createTestPlaybookService();
    playbookService.getTemplates = () => Promise.resolve(templates);

    const activePlaybookServiceFactoryMap = ServiceSimulator.createTestActivePlaybookServiceFactoryMap();
    activePlaybookServiceFactoryMap.set("test", () => playbookService);

    const inputService = ServiceSimulator.createTestInputService({
      multiChoiceAnswer: "",
    });
    const logger = ServiceSimulator.createTestLogger();
    const templateService = ServiceSimulator.createTestStorageService<Template>();

    const serviceCollection = ServiceSimulator.createTestServiceCollection({
      activePlaybookServiceFactoryMap,
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
