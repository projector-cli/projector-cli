import { ObjectService } from "..";
import { ConfigKey } from "../../constants";
import {
  BacklogItemTemplate,
  PlaybookService,
  RepoItem,
  RepoService,
  RepoTemplate,
  StorageService,
} from "../../models";
import { sampleWorkItemTemplates } from "../../samples";
import { Config } from "../../utils";

export class CodeWithPlaybookService implements PlaybookService {
  private repoService: RepoService;
  private contentService: ObjectService<string>;
  private playbookRepoName: string;
  private storageService: StorageService;

  constructor(repoService: RepoService, contentService: ObjectService<string>, storageService: StorageService) {
    this.repoService = repoService;
    this.contentService = contentService;
    this.playbookRepoName = Config.getValue(ConfigKey.PlaybookRepoName);
    this.storageService = storageService;
  }

  public async getBacklogItemTemplates(): Promise<BacklogItemTemplate[]> {
    const templatesList = await this.repoService.listRepoItems(
      this.playbookRepoName,
      Config.getValue(ConfigKey.PlaybookWorkItemTemplatesPath),
      true,
    );

    const backlogItemTemplates: BacklogItemTemplate[] = sampleWorkItemTemplates;

    const objectService = new ObjectService<BacklogItemTemplate>(this.storageService);

    templatesList.forEach((repoItem: RepoItem) => {
      const { content, name } = repoItem;
      if (content !== undefined && typeof content === "string") {
        const template = objectService.parse(content, name);
        if (template) {
          backlogItemTemplates.push(template);
        }
      }
    });

    return backlogItemTemplates;
  }

  public async getTemplates(): Promise<RepoTemplate[]> {
    const templatesName = Config.getValue(ConfigKey.PlaybookTemplateManifestPath);
    const templatesFile = await this.repoService.getRepoItem(this.playbookRepoName, templatesName, true);
    if (!templatesFile || !templatesFile.content) {
      throw new Error(`Couldn't find ${templatesName}, or it was empty.`);
    }

    const { name, content } = templatesFile;

    if (typeof content !== "string") {
      throw new Error("templatesFile had unexpected content.");
    }

    const objectService = new ObjectService<RepoTemplate[]>(this.storageService);
    const templates = objectService.parse(content, name);

    if (!Array.isArray(templates)) {
      throw new Error("Template file content should be an array");
    }

    return templates;
  }

  public async getRepoItem(templateName: string, includeContent = false): Promise<RepoItem> {
    const templates = await this.getTemplates();
    const template = templates.find((target) => target.name === templateName);
    if (!template) {
      throw new Error(
        `No such template ${templateName}. Available templates are:\n${templates
          .map((target) => target.name)
          .join("\n")}`,
      );
    }

    const { filePath, fileName } = template;
    const repoPath = `${filePath}/${fileName}`;

    return this.repoService.getRepoItem(this.playbookRepoName, repoPath, includeContent);
  }

  public async downloadTemplate(localRelativePath: string, template: RepoTemplate): Promise<void> {
    const { filePath, fileName } = template;
    const repoPath = [filePath, fileName].filter((value: string) => value && value.length).join("/");
    const { content } = await this.repoService.getRepoItem(this.playbookRepoName, repoPath, true);

    if (!content) {
      throw new Error(`Couldn't get content from template ${template.name}`);
    }

    await this.contentService.set(localRelativePath, content);
  }
}
