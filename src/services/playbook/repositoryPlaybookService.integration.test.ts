import { PlaybookService } from "..";
import { ConfigKey } from "../../constants";
import { Template, RepoService } from "../../models";
import { Config } from "../../utils";
import { GitHubRepoService, RepoServiceProvider } from "../repo";
import { RepositoryPlaybookService } from "./repositoryPlaybookService";

describe("Playbook Service Integration Tests", () => {
  const githubService: RepoService = new GitHubRepoService({
    accessToken: Config.getValue(ConfigKey.TestGitHubAccessToken),
    baseUrl: `https://github.com/${Config.getValue(ConfigKey.PlaybookOwnerName)}`,
    projectName: Config.getValue(ConfigKey.PlaybookRepoName),
    repoProvider: RepoServiceProvider.GitHub,
  });

  const playbookService: PlaybookService = new RepositoryPlaybookService(githubService);

  it("gets backlog item templates", async () => {
    const templates = await playbookService.getTemplates();
    expect(templates.length > 2).toBe(true);
    templates.forEach((template: Template) => {
      expect(template.name).toBeDefined();
      expect(template.items).toBeDefined();
    });
  });

  it("gets templates", async () => {
    const templates = await playbookService.getTemplates();
    expect(templates.length > 2).toBe(true);
    templates.forEach((template: Template) => {
      expect(template.name).toBeDefined();
    });
  });
});
