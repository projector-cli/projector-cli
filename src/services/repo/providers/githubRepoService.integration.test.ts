import { ConfigKey } from "../../../constants";
import { RepoService } from "../../../models";
import { ServiceSimulator } from "../../../test";
import { Config } from "../../../utils";
import { RepoServiceProvider } from "../repoServiceProvider";
import { GitHubRepoService } from "./githubRepoService";

describe("GitHub Repo Service", () => {
  const contentService = ServiceSimulator.createTestObjectService<string>();
  const repoName = Config.getValue(ConfigKey.TestGitHubRepoName);
  // Setup
  const service: RepoService = new GitHubRepoService(
    {
      repoProvider: RepoServiceProvider.GitHub,
      accessToken: Config.getValue(ConfigKey.TestGitHubAccessToken),
      baseUrl: Config.getValue(ConfigKey.TestGitHubBaseUrl),
      projectName: repoName,
    },
    contentService,
  );

  it("gets the latest commit hash", async () => {
    // Act
    const result = await service.latestCommit(repoName, "master");

    // Assert
    expect(result).toBeTruthy();
  });

  it("gets children from directory in repo", async () => {
    // Act
    const github = await service.getRepoItem(repoName, "directory", false, "master");

    // Assert
    expect(github.children).toBeDefined();
  }, 60000);

  it("gets content from file in repo", async () => {
    // Act
    const file = await service.getRepoItem(repoName, "directory/content.txt", true, "master");

    // Assert
    expect(file.content).toEqual("This is my content");
  }, 60000);
});
