import { ConfigKey } from "../constants";
import { RepoProviderOptions } from "../models";
import { RepoServiceProvider } from "../services";
import { ServiceSimulator } from "../test";
import { Config } from "../utils";
import { PlaybookServiceFactory } from "./playbookServiceFactory";
import { RepoServiceFactory } from "./repoServiceFactory";

describe("Playbook Service Factory", () => {
  it("creates an authenticated playbook service", () => {
    const accessToken = "token";

    RepoServiceFactory.get = jest.fn(() => ServiceSimulator.createTestRepoService());

    PlaybookServiceFactory.get(
      {
        playbookAccessToken: accessToken,
      },
      ServiceSimulator.createTestObjectService(),
      ServiceSimulator.createTestStorageService(),
    );

    const expectedRepoOptions: RepoProviderOptions = {
      repoProvider: RepoServiceProvider.GitHub,
      accessToken,
      baseUrl: `https://github.com/${Config.getValue(ConfigKey.PlaybookOwnerName)}`,
      projectName: Config.getValue(ConfigKey.PlaybookRepoName),
    };

    expect(RepoServiceFactory.get).toBeCalledWith(expectedRepoOptions, expect.anything());
  });

  it("creates an unauthenticated playbook service", () => {
    RepoServiceFactory.get = jest.fn(() => ServiceSimulator.createTestRepoService());

    PlaybookServiceFactory.get(
      {},
      ServiceSimulator.createTestObjectService(),
      ServiceSimulator.createTestStorageService(),
    );

    const expectedRepoOptions: RepoProviderOptions = {
      repoProvider: RepoServiceProvider.GitHub,
      accessToken: "",
      baseUrl: `https://github.com/${Config.getValue(ConfigKey.PlaybookOwnerName)}`,
      projectName: Config.getValue(ConfigKey.PlaybookRepoName),
    };

    expect(RepoServiceFactory.get).toBeCalledWith(expectedRepoOptions, expect.anything());
  });
});
