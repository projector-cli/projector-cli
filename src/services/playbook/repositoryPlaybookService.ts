import path from "path";
import { ConfigKey } from "../../constants";
import { RepoItem, RepoItemType, RepoService, Template } from "../../models";
import { Config } from "../../utils";
import { PlaybookService, TemplateFilterOptions } from "./playbookService";

export class RepositoryPlaybookService implements PlaybookService {
  private repoService: RepoService;
  private playbookRepoName: string;

  constructor(repoService: RepoService) {
    this.repoService = repoService;
    this.playbookRepoName = Config.getValue(ConfigKey.PlaybookRepoName);
  }

  public async getTemplates(options?: TemplateFilterOptions): Promise<Template[]> {
    const { branch, name, subdirectory, all } = options ?? {};
    const subdir = subdirectory ?? "";

    if (!!all) {
      const items: Template[] = [];
      const templatesList = await this.repoService.listRepoItems(
        this.playbookRepoName,
        path.join(Config.getValue(ConfigKey.PlaybookWorkItemTemplatesPath), subdir),
        true,
        branch,
      );

      const templates = templatesList
        .filter((repoItem) => repoItem.type === RepoItemType.File)
        .map((repoItem: RepoItem) => repoItem.content)
        .filter((item): item is Template => !!item);

      items.concat(templates);

      const directories = templatesList.filter((repoItem) => repoItem.type === RepoItemType.Directory);
      const results = await Promise.all(
        directories.map(async (directory) => {
          return await this.getTemplates({ all, subdirectory: path.join(subdir, directory.name) });
        }),
      );

      return items.concat(results.reduce((previous, current) => previous.concat(current)));
    }

    if (!!name) {
      const template = await this.repoService.getRepoItem(
        this.playbookRepoName,
        path.join(Config.getValue(ConfigKey.PlaybookWorkItemTemplatesPath), subdir, name),
        true,
        branch,
      );

      return template.content ? [template.content] : [];
    }

    const templatesList = await this.repoService.listRepoItems(
      this.playbookRepoName,
      path.join(Config.getValue(ConfigKey.PlaybookWorkItemTemplatesPath), subdir),
      true,
      branch,
    );

    const templates = templatesList
      .map((repoItem: RepoItem) => repoItem.content)
      .filter((item): item is Template => !!item);

    return templates;
  }
}
