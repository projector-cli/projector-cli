import { FileConstants } from "../../../../constants";
import { Command } from "../../../../extensions";
import { AgileProviderOptions, ServiceCollection } from "../../../../models";
import { Filetype } from "../../../../models/general/filetype";

export interface AgileImportOptions extends AgileProviderOptions {
  directory: string;
  format: string;
}

export const projectTemplateImportCommandFactory = (): Command => {
  return new Command<AgileImportOptions>()
    .name("import")
    .description("Project Template Import")
    .optionInteractive({
      shortName: "-d",
      longName: "--directory",
      description: "Directory to write to, which will be created if it does not exist.",
      defaultValue: FileConstants.importDirectory,
      prompt: "Which directory would you like to save the imported file[s] to?",
    })
    .optionInteractive({
      shortName: "-f",
      longName: "--format",
      description: "Format to save the file in",
      defaultValue: FileConstants.defaultFileType,
      prompt: "What file format would you like to save the imported files in?",
      choices: Object.values(Filetype),
    })
    .addAction(async (serviceCollection: ServiceCollection, options: AgileImportOptions) => {
      const { logger, activePlaybookServiceFactoryMap, templateService } = serviceCollection;
      const { format, directory } = options;

      activePlaybookServiceFactoryMap.forEach(async (getPlaybook, playbookName) => {
        const playbook = getPlaybook();
        const templates = await playbook.getTemplates();
        logger.logHeader("Starting import...");
        templates.forEach((template) =>
          templateService.write(`${template.name}-${playbookName}${format}`, template, directory),
        );
      });
    });
};
