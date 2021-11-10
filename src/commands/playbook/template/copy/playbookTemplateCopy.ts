import { Command } from "../../../../extensions";
import { Template, ServiceCollection } from "../../../../models";

export interface PlaybookTemplateCopyOptions {
  templateName: string;
  branch: string;
  outPath: string;
}

export const playbookTemplateCopyCommandFactory = (): Command<PlaybookTemplateCopyOptions> => {
  return new Command<PlaybookTemplateCopyOptions>()
    .name("copy")
    .description("Copy templates from playbook to local working directory")
    .option("-b, --branch <branch>", "Branch of playbook repo to use")
    .option("-o, --out-path <out-path>", "Local path to which file will be written.")
    .option("-t, --template-name <template-name>", "Playbook template name")
    .addAction(async (serviceCollection: ServiceCollection, options: PlaybookTemplateCopyOptions) => {
      const { logger, activePlaybookServiceFactoryMap, templateService } = serviceCollection;
      const { outPath, branch, templateName } = options;
      activePlaybookServiceFactoryMap.forEach(async (getPlaybook, playbookName) => {
        const playbookService = getPlaybook();
        const templates: Template[] = await playbookService.getTemplates({ branch, name: templateName });

        if (!templates || templates.length === 0) {
          logger.log("Templates folder appears to be empty.");
        } else {
          logger.logHeader(`Playbook ${playbookName} Templates`);
          templates.forEach((template: Template) => {
            logger.log(`Writing ${template.name}`);
            templateService.write(template.name, template, outPath);
          });
        }
      });
    });
};
