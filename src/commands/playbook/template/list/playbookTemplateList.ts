import { Command } from "../../../../extensions";
import { ServiceCollection, PlaybookOptions, RepoTemplate } from "../../../../models";
import { PlaybookTemplateCopyOptions } from "../copy/playbookTemplateInit";

export const playbookTemplateListCommandFactory = (): Command => {
  return new Command<PlaybookTemplateCopyOptions>()
    .name("list")
    .description("List available templates.")
    .addPlaybookOptions()
    .addAction(async (serviceCollection: ServiceCollection, options: PlaybookOptions) => {
      const { logger, getPlaybookService } = serviceCollection;
      const playbookService = getPlaybookService(options);

      const templates: RepoTemplate[] = await playbookService.getTemplates();

      if (!templates || templates.length === 0) {
        logger.log("Templates file appears to be empty.");
      } else {
        logger.logHeader("Playbook Templates");
        templates.forEach((template: RepoTemplate) => {
          logger.log(`- ${template.name}`);
        });
      }
    });
};
