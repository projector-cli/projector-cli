import { AgileService } from "..";
import { Sprint, Template } from "../../models";
import { ProjectService } from "./projectService";

export class RepositoryProjectService implements ProjectService {
  constructor(private agileService: AgileService) {}

  public async createSprints(sprints: Sprint[]): Promise<Sprint[]> {
    return (await this.agileService.createSprints(sprints)) ?? [];
  }

  public async deployTemplates(templates: Template[]): Promise<Template[]> {
    templates.forEach(async (template) => await this.agileService.createBacklogItems(template.items));
    return templates;
  }
}
