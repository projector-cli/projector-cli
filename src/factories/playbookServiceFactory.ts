import { ConfigKey } from "../constants";
import { PlaybookOptions, PlaybookService, StorageService } from "../models";
import { CodeWithPlaybookService, ObjectService, RepoServiceProvider } from "../services";
import { Config } from "../utils";
import { RepoServiceFactory } from "./repoServiceFactory";

export class PlaybookServiceFactory {
  public static get(
    options: PlaybookOptions,
    contentService: ObjectService<string>,
    storageService: StorageService,
  ): PlaybookService {
    const playbookOwner = Config.getValue(ConfigKey.PlaybookOwnerName);
    const playbookRepoName = Config.getValue(ConfigKey.PlaybookRepoName);

    const repoService = RepoServiceFactory.get(
      {
        repoProvider: RepoServiceProvider.GitHub,
        accessToken: options.playbookAccessToken || "",
        baseUrl: `https://github.com/${playbookOwner}`,
        projectName: playbookRepoName,
      },
      contentService,
    );

    return new CodeWithPlaybookService(repoService, contentService, storageService);
  }
}
