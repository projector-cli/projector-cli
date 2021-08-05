import path from "path";
import { Template, RepoItem, RepoItemType, RepoService } from "../../models";
import { ServiceSimulator } from "../../test";
import { RepositoryPlaybookService } from "./repositoryPlaybookService";

describe("Code With Playbook playbookService", () => {
  const templateName = "template";
  const templateFileName = "templates.json";

  const templateItem: Template = {
    name: templateName,
    description: "description",
    items: [],
  };

  const content: Template = templateItem;
  const templateRepoItem: RepoItem = {
    type: RepoItemType.File,
    name: templateFileName,
    path: path.sep,
    content,
  };

  it("gets templates", async () => {
    const repoService: RepoService = {
      ...ServiceSimulator.createTestRepoService(),
      getRepoItem: jest.fn(() => Promise.resolve(templateRepoItem)),
    };

    const playbookService = new RepositoryPlaybookService(repoService);
    expect((await playbookService.getTemplates()).length).toBeTruthy();
  });
});
