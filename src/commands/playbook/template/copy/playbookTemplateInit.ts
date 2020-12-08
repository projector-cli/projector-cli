import { Command } from "../../../../extensions";
import { PlaybookOptions, ServiceCollection, RepoTemplate } from "../../../../models";
import { downloadTemplates } from "../../../../utils";

export interface PlaybookTemplateCopyOptions extends PlaybookOptions {
  templateName: string;
  branch: string;
  outPath: string;
}

export const playbookTemplateInitCommandFactory = (): Command => {
  return new Command<PlaybookTemplateCopyOptions>()
    .name("init")
    .description("Copy templates from playbook to local working directory")
    .addPlaybookOptions()
    .option("-b, --branch <branch>", "Branch of playbook repo to use")
    .option("-t, --template-name <template-name>", "Playbook template name")
    .option("-o, --out-path <out-path>", "Local path to which file will be written.")
    .addAction(async (serviceCollection: ServiceCollection, options: PlaybookTemplateCopyOptions) => {
      const { logger, getPlaybookService, inputService, metrics } = serviceCollection;
      const playbookService = getPlaybookService(options);

      const { templateName, outPath } = options;
      await downloadTemplates(
        () => playbookService.getTemplates(),
        (outputFileName: string, template: RepoTemplate) => playbookService.downloadTemplate(outputFileName, template),
        inputService,
        logger,
        metrics,
        templateName,
        outPath,
      );
    });
};
