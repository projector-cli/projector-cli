import { Command } from "../../../../extensions";
import { Template, ServiceCollection, PlaybookOptions } from "../../../../models";
import { PlaybookTemplateCopyOptions } from "../copy/playbookTemplateCopy";

export const playbookTemplateListCommandFactory = (): Command<PlaybookTemplateCopyOptions> => {
  return new Command<PlaybookTemplateCopyOptions>()
    .name("list")
    .description("List available templates.")
    .addAction(async (serviceCollection: ServiceCollection, options: PlaybookOptions) => {
      const { logger, getPlaybookService } = serviceCollection;
      const playbookService = getPlaybookService(options);

      const templates: Template[] = await playbookService.getTemplates();

      if (!templates || templates.length === 0) {
        logger.log("Templates folder appears to be empty.");
      } else {
        logger.logHeader("Playbook Templates");
        templates.forEach((template: Template) => {
          logger.log(`- ${template.name}`);
        });
      }
    });
};
