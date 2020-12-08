import { ConfigKey } from "../../constants";
import { BacklogItemTemplate, PlaybookService, RepoService, RepoTemplate } from "../../models";
import { ServiceSimulator } from "../../test";
import { Config } from "../../utils";
import { GitHubRepoService, RepoServiceProvider } from "../repo";
import { CodeWithPlaybookService } from "./codeWithPlaybookService";

describe("Playbook Service Integration Tests", () => {
  const contentService = ServiceSimulator.createTestObjectService<string>();
  const storageService = ServiceSimulator.createTestStorageService();

  const githubService: RepoService = new GitHubRepoService(
    {
      accessToken: Config.getValue(ConfigKey.TestGitHubAccessToken),
      baseUrl: `https://github.com/${Config.getValue(ConfigKey.PlaybookOwnerName)}`,
      projectName: Config.getValue(ConfigKey.PlaybookRepoName),
      repoProvider: RepoServiceProvider.GitHub,
    },
    contentService,
  );

  const playbookService: PlaybookService = new CodeWithPlaybookService(githubService, contentService, storageService);

  it("gets backlog item templates", async () => {
    const templates = await playbookService.getBacklogItemTemplates();
    expect(templates.length > 2).toBe(true);
    templates.forEach((template: BacklogItemTemplate) => {
      expect(template.name).toBeDefined();
      expect(template.items).toBeDefined();
    });
  });

  it("gets templates", async () => {
    const templates = await playbookService.getTemplates();
    expect(templates.length > 2).toBe(true);
    templates.forEach((template: RepoTemplate) => {
      expect(template.name).toBeDefined();
      expect(template.fileName).toBeDefined();
      expect(template.filePath).toBeDefined();
    });
  });
});
