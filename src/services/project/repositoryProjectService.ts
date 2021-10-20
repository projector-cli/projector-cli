import { AgileService, StorageService } from "..";
import { Logger, Sprint, Template } from "../../models";
import { ProjectService, TemplateDeploymentOptions } from "./projectService";

export class RepositoryProjectService implements ProjectService {
  constructor(
    private agileService: AgileService,
    private templateService: StorageService<Template>,
    private logger: Logger,
  ) {}

  public async createSprints(sprints: Sprint[]): Promise<Sprint[]> {
    return (await this.agileService.createSprints(sprints)) ?? [];
  }

  public async deployTemplates(options: TemplateDeploymentOptions): Promise<Template[]> {
    const templateNames = options.all ? await this.templateService.list() : options.templates;
    if (!templateNames) {
      this.logger.log("Couldn't find any templates.");
      return [];
    }

    const templates = await Promise.all(
      templateNames.map(async (templateName) => this.templateService.read(templateName)),
    );
    const validTemplates = templates.filter((template): template is Template => !!template);

    validTemplates.forEach(async (template) => await this.agileService.createBacklogItems(template.items));

    return validTemplates;
  }
}
