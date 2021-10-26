import { Sprint, Template } from "../../models";

export interface ProjectService {
  createSprints(sprints: Sprint[]): Promise<Sprint[]>;
  deployTemplates(options: Template[]): Promise<Template[]>;
}
