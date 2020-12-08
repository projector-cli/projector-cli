import path from "path";
import { ConfigKey } from "../../constants";
import { RepoItem, RepoItemType, RepoService, RepoTemplate } from "../../models";
import { ServiceSimulator } from "../../test";
import { Config } from "../../utils";
import { CodeWithPlaybookService } from "./codeWithPlaybookService";

describe("Code With Playbook playbookService", () => {
  const templateName = "template";
  const templateFileName = "templates.json";
  const templateFilePath = "projector";

  const templateItem = {
    name: templateName,
    filePath: templateFilePath,
    fileName: templateFileName,
  };

  const content: RepoTemplate[] = [templateItem];
  const templateRepoItem: RepoItem = {
    type: RepoItemType.File,
    name: templateFileName,
    path: path.sep,
    content: JSON.stringify(content),
  };

  it("gets templates", async () => {
    const repoService: RepoService = {
      ...ServiceSimulator.createTestRepoService(),
      getRepoItem: jest.fn(() => Promise.resolve(templateRepoItem)),
    };
    const contentService = ServiceSimulator.createTestObjectService<string>();
    const storageService = ServiceSimulator.createTestStorageService();

    const playbookService = new CodeWithPlaybookService(repoService, contentService, storageService);
    expect((await playbookService.getTemplates()).length).toBeTruthy();
  });

  it("gets a repo item", async () => {
    const repoService: RepoService = {
      ...ServiceSimulator.createTestRepoService(),
      getRepoItem: jest.fn(() => Promise.resolve(templateRepoItem)),
    };
    const contentService = ServiceSimulator.createTestObjectService<string>();
    const storageService = ServiceSimulator.createTestStorageService();

    const playbookService = new CodeWithPlaybookService(repoService, contentService, storageService);

    const item = await playbookService.getRepoItem(templateName, true);

    expect(repoService.getRepoItem).toBeCalledWith(
      Config.getValue(ConfigKey.PlaybookRepoName),
      Config.getValue(ConfigKey.PlaybookTemplateManifestPath),
      true,
    );
    expect(item).toEqual(templateRepoItem);
  });

  it("downloads a repo item", async () => {
    const outputPath = "myOutputPath";

    const repoService: RepoService = {
      ...ServiceSimulator.createTestRepoService(),
      getRepoItem: jest.fn(() => Promise.resolve(templateRepoItem)),
    };
    const contentService = ServiceSimulator.createTestObjectService<string>();
    const storageService = ServiceSimulator.createTestStorageService();

    const playbookService = new CodeWithPlaybookService(repoService, contentService, storageService);

    await playbookService.downloadTemplate(outputPath, templateItem);

    expect(repoService.getRepoItem).toBeCalledWith(
      Config.getValue(ConfigKey.PlaybookRepoName),
      `${templateFilePath}/${templateFileName}`,
      true,
    );
    expect(contentService.set).toBeCalledWith(outputPath, JSON.stringify(content));
  });

  it("gets backlog item templates", async () => {
    const repoItems: RepoItem[] = [
      {
        name: "repoItem",
        path: "my/path",
        type: RepoItemType.File,
      },
    ];

    const repoService = {
      ...ServiceSimulator.createTestRepoService(),
      listRepoItems: jest.fn(() => Promise.resolve(repoItems)),
    };
    const contentService = ServiceSimulator.createTestObjectService<string>();
    const storageService = ServiceSimulator.createTestStorageService();

    const playbookService = new CodeWithPlaybookService(repoService, contentService, storageService);

    await playbookService.getBacklogItemTemplates();
    expect(repoService.listRepoItems).toBeCalledTimes(1);
  });
});
