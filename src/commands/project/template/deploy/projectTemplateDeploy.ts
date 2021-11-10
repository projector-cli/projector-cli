import { Command } from "../../../../extensions";
import { ServiceCollection, Template } from "../../../../models";

export interface TemplateDeploymentOptions {
  all?: boolean;
  templates?: string[];
}

export const projectTemplateDeployCommandFactory = (): Command<TemplateDeploymentOptions> => {
  return new Command<TemplateDeploymentOptions>()
    .name("deploy")
    .description("Template Deployment")
    .option("-a --all <all>", "Deploy all templates", false)
    .option("-t --templates [templates...]", "Which templates to deploy")
    .addAction(async (serviceCollection: ServiceCollection, options: TemplateDeploymentOptions) => {
      const { logger, activeProjectServiceFactoryMap, templateService } = serviceCollection;
      const templateNames = options.all ? await templateService.list() : options.templates;
      if (!templateNames) {
        logger.log("Couldn't find any templates.");
        return;
      }

      const templates = await Promise.all(
        templateNames.map(async (templateName) => templateService.read(templateName)),
      );
      const validTemplates = templates.filter((template): template is Template => !!template);

      for (const [projectName, getProject] of activeProjectServiceFactoryMap) {
        const project = getProject();
        await project.deployTemplates(validTemplates);

        logger.logHeader(`Created Items in ${projectName}`);
      }
    });
};
