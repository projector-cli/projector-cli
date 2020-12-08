import { ConfigKey } from "../../../constants";
import { Config } from "../../../utils";
import { generate } from "randomstring";
import { AzureDevOpsRepoService } from "./azureDevOpsRepoService";
import { RepoService } from "../../../models";
import { ServiceSimulator } from "../../../test";
import { RepoServiceProvider } from "../repoServiceProvider";

describe("Azure DevOps Repo Service", () => {
  const service: RepoService = new AzureDevOpsRepoService(
    {
      accessToken: Config.getValue(ConfigKey.TestAzDOAccessToken),
      baseUrl: Config.getValue(ConfigKey.TestAzDOBaseUrl),
      repoProvider: RepoServiceProvider.AzureDevOps,
      projectName: Config.getValue(ConfigKey.TestAzDOProjectName),
    },
    ServiceSimulator.createTestObjectService<string>(),
  );

  it("can create, list, get and delete repos", async () => {
    const newRepoName = generate({ length: 10, charset: "alphanumeric" });
    const createdRepo = await service.createRepo(newRepoName);

    expect(createdRepo.id).toBeDefined();
    expect(createdRepo.remoteUrl).toBeDefined();
    expect(createdRepo.name).toEqual(newRepoName);

    const retrievedRepo = await service.getRepo(newRepoName);
    expect(retrievedRepo).toEqual(createdRepo);

    const repos = await service.listRepos();

    if (repos!.length > 1) {
      try {
        await service.deleteRepo(createdRepo.id!);
      } catch (err) {
        // Error seems intermittent, even with multiple repos with if statement above
        // Swallows that specific message, throws otherwise
        if (!err.message || !err.message.includes("There must always be at least one repository")) {
          throw err;
        }
      }
      const nonExistentRepo = await service.getRepo(newRepoName);
      expect(nonExistentRepo).toBeUndefined();
    }
  }, 60000);
});
