import { Command } from "../../../../extensions";
import { Template, PlaybookOptions, ServiceCollection } from "../../../../models";

export interface PlaybookTemplateCopyOptions extends PlaybookOptions {
  templateName: string;
  branch: string;
  outPath: string;
}

export const playbookTemplateCopyCommandFactory = (): Command => {
  return new Command<PlaybookTemplateCopyOptions>()
    .name("copy")
    .description("Copy templates from playbook to local working directory")
    .addPlaybookOptions()
    .option("-b, --branch <branch>", "Branch of playbook repo to use")
    .option("-t, --template-name <template-name>", "Playbook template name")
    .option("-o, --out-path <out-path>", "Local path to which file will be written.")
    .addAction(async (serviceCollection: ServiceCollection, options: PlaybookTemplateCopyOptions) => {
      const { logger, getPlaybookService, templateService } = serviceCollection;
      const playbookService = getPlaybookService(options);
      const { outPath, branch, templateName } = options;

      const templates: Template[] = await playbookService.getTemplates({ branch, name: templateName });

      if (!templates || templates.length === 0) {
        logger.log("Templates folder appears to be empty.");
      } else {
        logger.logHeader("Playbook Templates");
        templates.forEach((template: Template) => {
          logger.log(`Writing ${template.name}`);
          templateService.write(template.name, template, outPath);
        });
      }
    });
};
