import * as coreInterfaces from "azure-devops-node-api/interfaces/CoreInterfaces";
import { ConfigKey } from "../../../../constants";
import { Command } from "../../../../extensions";
import { AgileProviderOptions, ServiceCollection, Project } from "../../../../models";
import { agileProjectDescriptionInteractiveOption } from "../../../../options";
import { Config } from "../../../../utils";

export interface ProjectInitializationOptions extends AgileProviderOptions {
  projectName: string;
  projectDescription: string;
}

export const agileProjectCreateCommandFactory = (): Command => {
  return new Command<ProjectInitializationOptions>()
    .name("create")
    .description("Create Project with Agile Provider")
    .addAgileProviderOptions()
    .optionInteractive(agileProjectDescriptionInteractiveOption)
    .addAction(async (serviceCollection: ServiceCollection, options: ProjectInitializationOptions) => {
      const { logger, getAgileService } = serviceCollection;
      const agileService = getAgileService(options);
      const sourceControlType = Config.getValue(ConfigKey.AgileDefaultSourceControl);
      // template for agile project
      const templateId = Config.getValue(ConfigKey.AgileDefaultProjectTemplateId);

      const { projectName, projectDescription } = options;

      const project: Project = {
        name: projectName,
        description: projectDescription,
        visibility: coreInterfaces.ProjectVisibility.Organization,
        capabilities: {
          versioncontrol: {
            sourceControlType: sourceControlType,
          },
          processTemplate: {
            templateTypeId: templateId,
          },
        },
      };

      await agileService.createProject(project);

      logger.log(`Agile project ${projectName} has been created`);
    });
};
