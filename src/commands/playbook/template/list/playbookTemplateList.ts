import { Command } from "../../../../extensions";
import { Template, ServiceCollection } from "../../../../models";

export interface PlaybookTemplateListOptions {
  branch: string;
}

export const playbookTemplateListCommandFactory = (): Command<PlaybookTemplateListOptions> => {
  return new Command<PlaybookTemplateListOptions>()
    .name("list")
    .description("List available templates.")
    .option("-b", "The branch to list the templates from in the targeted repositories.", "main")
    .addAction(async (serviceCollection: ServiceCollection, options: PlaybookTemplateListOptions) => {
      const { logger, activePlaybookServiceFactoryMap } = serviceCollection;
      activePlaybookServiceFactoryMap.forEach(async (getPlaybook, playbookName) => {
        const playbookService = getPlaybook();
        const templates: Template[] = await playbookService.getTemplates({ branch: options.branch });

        if (!templates || templates.length === 0) {
          logger.log(`Templates folder appears to be empty in playbook ${playbookName}.`);
        } else {
          logger.logHeader(`Playbook ${playbookName} Templates`);
          templates.forEach((template: Template) => {
            logger.log(`- ${template.name}`);
          });
        }
      });
    });
};
