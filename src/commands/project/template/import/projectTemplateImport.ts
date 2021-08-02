import { stringify } from "yaml";
import { FileConstants } from "../../../../constants";
import { Command } from "../../../../extensions";
import { AgileProviderOptions, ServiceCollection, BacklogItem } from "../../../../models";
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
      const { logger, getAgileService, contentService } = serviceCollection;

      const agileService = getAgileService(options);

      const backlogItems = await agileService.getBacklogItems();
      const fileExtension = options.format;

      logger.logHeader("Starting import...");
      backlogItems.forEach((backlogItem) => {
        const filename = generateFileName(backlogItem, fileExtension);
        logger.debug(`Importing ${filename}`);
        const writeLocation = options.directory?.toLowerCase().trim() ?? FileConstants.importDirectory;
        switch (fileExtension) {
          case ".yaml":
            contentService.set(filename, stringify(backlogItem), writeLocation);
            break;
          default:
            contentService.set(filename, JSON.stringify(backlogItem), writeLocation);
        }
      });
    });

  /**
   * Generates a filename in a consistent compartmentalized way.
   *
   * @param {BacklogItem} item The backlog item to derive the filename from.
   * @param {string} extension The file extension to write.
   *
   * @returns {string} The filename.
   */
  function generateFileName(item: BacklogItem, extension: string): string {
    return item.type.toLowerCase().concat("-", item.id || item.name.toLowerCase().replace(" ", "-"), extension);
  }
};
