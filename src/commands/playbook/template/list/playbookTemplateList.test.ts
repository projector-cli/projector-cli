import { Template } from "../../../../models";
import { CliSimulator, ServiceSimulator } from "../../../../test";
import { playbookTemplateListCommandFactory } from "./playbookTemplateList";

describe("Playbook Template List Command", () => {
  it("successfully calls the playbook service", async () => {
    const templateFileContent: Template[] = [
      {
        name: "fileName",
        description: "",
        items: [],
      },
    ];

    const playbookService = ServiceSimulator.createTestPlaybookService();
    playbookService.getTemplates = jest.fn(() => Promise.resolve(templateFileContent));

    const activePlaybookServiceFactoryMap = ServiceSimulator.createTestActivePlaybookServiceFactoryMap();
    activePlaybookServiceFactoryMap.set("test", () => playbookService);

    const serviceCollection = ServiceSimulator.createTestServiceCollection({ activePlaybookServiceFactoryMap });

    const playbookTemplateList = playbookTemplateListCommandFactory();

    await playbookTemplateList.setServiceCollection(serviceCollection).parseAsync(CliSimulator.createArgs());
    expect(playbookService.getTemplates).toBeCalled();
  });
});
