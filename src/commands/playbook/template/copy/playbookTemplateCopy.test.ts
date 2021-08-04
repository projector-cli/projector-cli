import { RepoItemType, Template } from "../../../../models";
import { InputService, RepositoryPlaybookService } from "../../../../services";
import { ServiceSimulator, CliSimulator } from "../../../../test";
import { playbookTemplateCopyCommandFactory } from "./playbookTemplateCopy";

describe("Playbook Template Copy Command", () => {
  it("copies a template from the playbook", async () => {
    const templateItem: Template = {
      name: "my-template-1",
      description: "",
      items: [],
    };
    const repoService = ServiceSimulator.createTestRepoService(undefined, {
      name: "templates.json",
      path: "",
      type: RepoItemType.File,
      content: templateItem,
    });

    const playbookService = new RepositoryPlaybookService(repoService);
    const inputService: InputService = {
      ...ServiceSimulator.createTestInputService(),
      askQuestion: jest.fn((question: string, defaultAnswer?: string) => Promise.resolve(defaultAnswer || "")),
    };

    const serviceCollection = ServiceSimulator.createTestServiceCollection({
      playbookService,
      inputService,
    });

    const templateName = "my-template-1";
    const outFilePath = "my/out/path/my-template.txt";
    const playbookTemplateCopy = playbookTemplateCopyCommandFactory();

    await playbookTemplateCopy.setServiceCollection(serviceCollection).parseAsync(
      CliSimulator.createPlaybookArgs([
        {
          name: "--template-name",
          value: templateName,
        },
        {
          name: "--out-path",
          value: outFilePath,
        },
      ]),
    );
  });
});
