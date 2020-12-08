import { FileConstants } from "../../../../../constants";
import { BacklogItemTemplate } from "../../../../../models";
import { sampleWorkItemTemplates } from "../../../../../samples";
import { CodeWithPlaybookService } from "../../../../../services";
import { ServiceSimulator, CliSimulator } from "../../../../../test";
import { agileWorkTemplateInitCommandFactory } from "./agileWorkTemplateInit";

describe("Agile Work Template Init", () => {
  beforeEach(() => {
    CodeWithPlaybookService.prototype.getBacklogItemTemplates = jest.fn(() => Promise.resolve(sampleWorkItemTemplates));
  });

  it("writes an empty template to the default output file", async () => {
    const playbookService = ServiceSimulator.createTestPlaybookService(undefined, sampleWorkItemTemplates);
    const backlogItemTemplateService = ServiceSimulator.createTestObjectService<BacklogItemTemplate>();
    const inputService = {
      ...ServiceSimulator.createTestInputService(),
      askQuestion: jest.fn((question: string, defaultAnswer?: string) => Promise.resolve(defaultAnswer || "")),
    };

    const serviceCollection = ServiceSimulator.createTestServiceCollection({
      playbookService,
      backlogItemTemplateService,
      inputService,
    });

    const templateName = "empty";

    const expectedTemplate = sampleWorkItemTemplates.find(
      (template: BacklogItemTemplate) => template.name === templateName,
    );
    const agileWorkTemplateInit = agileWorkTemplateInitCommandFactory();

    await agileWorkTemplateInit.setServiceCollection(serviceCollection).parseAsync([
      ...CliSimulator.createAgileArgs([
        {
          name: "--template-name",
          value: templateName,
        },
      ]),
      ...CliSimulator.createPlaybookArgs(),
    ]);

    expect(backlogItemTemplateService.set).toBeCalledWith(
      templateName + FileConstants.defaultConfigurationExtension,
      expectedTemplate,
    );
  });

  it("writes a template to a specified output file", async () => {
    const playbookService = ServiceSimulator.createTestPlaybookService(undefined, sampleWorkItemTemplates);
    const backlogItemTemplateService = ServiceSimulator.createTestObjectService<BacklogItemTemplate>();
    const inputService = {
      ...ServiceSimulator.createTestInputService(),
      askQuestion: jest.fn((question: string, defaultAnswer?: string) => Promise.resolve(defaultAnswer || "")),
    };

    const serviceCollection = ServiceSimulator.createTestServiceCollection({
      playbookService,
      backlogItemTemplateService,
      inputService,
    });
    const outputFileName = "out.json";

    const templateName = "example";
    const expectedTemplate = sampleWorkItemTemplates.find(
      (template: BacklogItemTemplate) => template.name === templateName,
    );

    const agileWorkTemplateInit = agileWorkTemplateInitCommandFactory();

    await agileWorkTemplateInit.setServiceCollection(serviceCollection).parseAsync([
      ...CliSimulator.createArgs([
        {
          name: "--template-name",
          value: templateName,
        },
        {
          name: "--out-path",
          value: outputFileName,
        },
      ]),
      ...CliSimulator.createPlaybookArgs(),
    ]);

    expect(backlogItemTemplateService.set).toBeCalledWith(outputFileName, expectedTemplate);
  });
});
