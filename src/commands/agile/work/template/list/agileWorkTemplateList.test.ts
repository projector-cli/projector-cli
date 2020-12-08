import { BacklogItemTemplate, BacklogItemType } from "../../../../../models";
import { sampleWorkItemTemplates } from "../../../../../samples";
import { CodeWithPlaybookService } from "../../../../../services";
import { ServiceSimulator, CliSimulator } from "../../../../../test";
import { agileWorkTemplateListCommandFactory } from "./agileWorkTemplateList";

describe("Agile Work Template List", () => {
  beforeAll(() => {
    CodeWithPlaybookService.prototype.getBacklogItemTemplates = jest.fn(() => Promise.resolve(sampleWorkItemTemplates));
  });

  it("lists work item templates", async () => {
    // Setup
    const workItemTemplates: BacklogItemTemplate[] = [
      {
        name: "name",
        description: "my description",
        path: "",
        items: [
          {
            name: "My story",
            type: BacklogItemType.Story,
          },
        ],
      },
    ];
    const playbookService = ServiceSimulator.createTestPlaybookService(undefined, workItemTemplates);
    const serviceCollection = ServiceSimulator.createTestServiceCollection({
      playbookService,
    });
    const { logger } = serviceCollection;
    const agileWorkTemplateList = agileWorkTemplateListCommandFactory();

    // Act
    await agileWorkTemplateList
      .setServiceCollection(serviceCollection)
      .parseAsync([...CliSimulator.createAgileArgs(), ...CliSimulator.createPlaybookArgs()]);

    // Assert
    expect(logger.logHeader).toBeCalledWith("Work Item Templates");
    expect(logger.log).toBeCalledTimes(workItemTemplates.length);
  });
});
