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
      shortName: "-f",
      longName: "--format",
      description: "Format to save the file in",
      defaultValue: FileConstants.defaultFileType,
      prompt: "What file format would you like to save the imported files in?",
      choices: Object.values(Filetype),
    })
    .optionInteractive({
      shortName: "-d",
      longName: "--directory",
      description: "Directory to write to, which will be created if it does not exist.",
      defaultValue: FileConstants.importDirectory,
      prompt: "Which directory would you like to save the imported file[s] to?",
    })
    .addAgileProviderOptions()
    .addAction(async (serviceCollection: ServiceCollection, options: AgileImportOptions) => {
      const { logger, getAgileService, templateService } = serviceCollection;

      const agileService = getAgileService(options);

      const backlogItems = await agileService.getBacklogItems();
      const { format, directory } = options;

      logger.logHeader("Starting import...");
      templateService.write(
        "import",
        {
          name: `import${format}`,
          description: "",
          items: backlogItems,
        },
        directory,
      );
    });
};
