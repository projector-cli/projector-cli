import { RepoTemplate, RepoService, RepoItem } from "../../../../models";
import { ServiceSimulator, CliSimulator } from "../../../../test";
import { playbookTemplateListCommandFactory } from "./playbookTemplateList";

describe("Playbook Template List Command", () => {
  it("successfully calls the playbook service", async () => {
    const templateFileContent: RepoTemplate[] = [
      {
        fileName: "fileName",
        filePath: "file/path",
        name: "testTemplate",
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
