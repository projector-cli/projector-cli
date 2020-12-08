import { Command } from "../../../../../extensions";
import { AgileProviderOptions, PlaybookOptions, ServiceCollection, BacklogItemTemplate } from "../../../../../models";
import { downloadTemplates } from "../../../../../utils";

export interface AgileWorkTemplateInitOptions extends AgileProviderOptions {
  templateName: string;
  outPath: string;
}

export const agileWorkTemplateInitCommandFactory = (): Command => {
  return new Command<AgileWorkTemplateInitOptions & PlaybookOptions>()
    .name("init")
    .description("Initialize work item template")
    .addAgileProviderOptions()
    .addPlaybookOptions()
    .option("-t, --template-name <template-name>", "Work Item Template Name")
    .option(
      "-o, --out-path <out-path>",
      "Output file name for initialized work item template. Defaults to template name if not provided",
    )
    .addAction(
      async (serviceCollection: ServiceCollection, options: AgileWorkTemplateInitOptions & PlaybookOptions) => {
        const { backlogItemTemplateService, getPlaybookService, logger, inputService, metrics } = serviceCollection;
        const playbookService = getPlaybookService(options);

        const { templateName, outPath } = options;
        await downloadTemplates(
          () => playbookService.getBacklogItemTemplates(),
          (outputFileName: string, template: BacklogItemTemplate) =>
            backlogItemTemplateService.set(outputFileName, template),
          inputService,
          logger,
          metrics,
          templateName,
          outPath,
        );
      },
    );
};
