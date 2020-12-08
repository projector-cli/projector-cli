import { Command } from "../../../../../extensions";
import { AgileProviderOptions, PlaybookOptions, ServiceCollection } from "../../../../../models";

export const agileWorkTemplateListCommandFactory = (): Command => {
  return new Command<AgileProviderOptions & PlaybookOptions>()
    .name("list")
    .description("List available work item templates")
    .addAgileProviderOptions()
    .addPlaybookOptions()
    .addAction(async (serviceCollection: ServiceCollection, options: AgileProviderOptions & PlaybookOptions) => {
      const { logger, getPlaybookService } = serviceCollection;
      const playbookService = getPlaybookService(options);
      const templates = await playbookService.getBacklogItemTemplates();
      logger.logHeader("Work Item Templates");
      templates.forEach((template) => logger.log(template.name));
    });
};
