import { RepoService, RepoItem, Template } from "../../../../models";
import { ServiceSimulator, CliSimulator } from "../../../../test";
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

    const repoService: RepoService = {
      ...ServiceSimulator.createTestRepoService(),
      getRepoItem: jest.fn(() => Promise.resolve(({ content: templateFileContent } as unknown) as RepoItem)),
    };

    const playbookService = ServiceSimulator.createTestPlaybookService(templateFileContent);

    const serviceCollection = ServiceSimulator.createTestServiceCollection({
      repoService,
      playbookService,
    });

    const playbookTemplateList = playbookTemplateListCommandFactory();

    await playbookTemplateList.setServiceCollection(serviceCollection).parseAsync(CliSimulator.createPlaybookArgs());
    expect(playbookService.getTemplates).toBeCalled();
  });
});
