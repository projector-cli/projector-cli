import { RepoTemplate, RepoItemType, InputService } from "../../../../models";
import { CodeWithPlaybookService } from "../../../../services";
import { ServiceSimulator, CliSimulator } from "../../../../test";
import { playbookTemplateInitCommandFactory } from "./playbookTemplateInit";

describe("Playbook Template Init Command", () => {
  it("copies a template from the playbook", async () => {
    const templateItems: RepoTemplate[] = [
      {
        name: "my-template-1",
        fileName: "template1.txt",
        filePath: "templates",
      },
      {
        name: "my-template-2",
        fileName: "template2.txt",
        filePath: "templates",
      },
    ];
    const repoService = ServiceSimulator.createTestRepoService(undefined, {
      name: "templates.json",
      path: "",
      type: RepoItemType.File,
      content: JSON.stringify(templateItems),
    });

    const contentService = ServiceSimulator.createTestObjectService<string>();
    const storageService = ServiceSimulator.createTestStorageService();

    const playbookService = new CodeWithPlaybookService(repoService, contentService, storageService);
    const inputService: InputService = {
      ...ServiceSimulator.createTestInputService(),
      askQuestion: jest.fn((question: string, defaultAnswer?: string) => Promise.resolve(defaultAnswer || "")),
    };

    const serviceCollection = ServiceSimulator.createTestServiceCollection({
      playbookService,
      inputService,
    });

    const downloadTemplateSpy = jest.spyOn(CodeWithPlaybookService.prototype, "downloadTemplate");

    const templateName = "my-template-1";
    const outFilePath = "my/out/path/my-template.txt";
    const playbookTemplateInit = playbookTemplateInitCommandFactory();

    await playbookTemplateInit.setServiceCollection(serviceCollection).parseAsync(
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
    expect(downloadTemplateSpy).toBeCalledWith(outFilePath, templateItems[0]);
  });
});
