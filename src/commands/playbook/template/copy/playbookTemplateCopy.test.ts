import { RepoItemType, Template } from "../../../../models";
import { InputService, PlaybookService, RepositoryPlaybookService } from "../../../../services";
import { ServiceSimulator, CliSimulator } from "../../../../test";
import { playbookTemplateCopyCommandFactory } from "./playbookTemplateCopy";

describe("Playbook Template Copy Command", () => {
  it("writes a template from the playbook to a provided storage", async () => {
    const templateItem: Template = {
      name: "my-template-1",
      description: "",
      items: [],
    };
    const templateService = ServiceSimulator.createTestStorageService<Template>();

    const playbookService = ServiceSimulator.createTestPlaybookService();
    playbookService.getTemplates = () => {
      return Promise.resolve([templateItem]);
    };
    const activePlaybookServiceFactoryMap = ServiceSimulator.createTestActivePlaybookServiceFactoryMap();

    const serviceCollection = ServiceSimulator.createTestServiceCollection({
      activePlaybookServiceFactoryMap,
      templateService,
    });

    const templateName = "my-template-1";
    const outFilePath = "my/out/path/my-template.txt";
    const playbookTemplateCopy = playbookTemplateCopyCommandFactory();

    await playbookTemplateCopy.setServiceCollection(serviceCollection).parseAsync(
      CliSimulator.createArgs([
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
