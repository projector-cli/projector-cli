import { Sprint, Template } from "../../models";

export interface TemplateDeploymentOptions {
  all?: boolean;
  templates?: string[];
}

export interface ProjectService {
  createSprints(sprints: Sprint[]): Promise<Sprint[]>;
  deployTemplates(options: TemplateDeploymentOptions): Promise<Template[]>;
}
