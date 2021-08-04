import { ConfigKey } from "../constants";
import { PlaybookOptions } from "../models";
import { PlaybookService, RepositoryPlaybookService, RepoServiceProvider } from "../services";
import { Config } from "../utils";
import { RepoServiceFactory } from "./repoServiceFactory";

export class PlaybookServiceFactory {
  public static get(options: PlaybookOptions): PlaybookService {
    const playbookOwner = Config.getValue(ConfigKey.PlaybookOwnerName);
    const playbookRepoName = Config.getValue(ConfigKey.PlaybookRepoName);

    const repoService = RepoServiceFactory.get({
      repoProvider: RepoServiceProvider.GitHub,
      accessToken: options.playbookAccessToken || "",
      baseUrl: `https://github.com/${playbookOwner}`,
      projectName: playbookRepoName,
    });

    return new RepositoryPlaybookService(repoService);
  }
}
