import { Command } from "../../../../extensions";
import { AgileProviderOptions, ServiceCollection, Logger, BacklogItem } from "../../../../models";

export interface AgileInitializationOptions extends AgileProviderOptions {
  file: string;
}

export const projectTemplateDeployCommandFactory = (): Command => {
  return new Command<AgileInitializationOptions>()
    .name("deploy")
    .description("Template Deployment")
    .option("-f, --file <file>", "File containing backlog item template")
    .optionInteractive({
      shortName: "-f",
      longName: "--file",
      prompt: "What is the name of the file containing your backlog items?",
      choices: async (serviceCollection: ServiceCollection) => {
        const { templateService } = serviceCollection;

        const files = await templateService.list();

        return [
          ...files?.filter(
            (filename: string) => filename.endsWith(".json") || filename.endsWith(".yml") || filename.endsWith(".yaml"),
          ),
          "other",
        ];
      },
    })
    .addAgileProviderOptions()
    .addAction(async (serviceCollection: ServiceCollection, options: AgileInitializationOptions) => {
      const { logger, getAgileService, templateService, inputService } = serviceCollection;
      const agileService = getAgileService(options);

      // The command will give the user the option to choose between files in the working directory
      // If user selects 'other', they can then specify another file
      const inputFile =
        options.file === "other"
          ? await inputService.askQuestion("What is the name of the file containing your backlog items?")
          : options.file;

      const template = await templateService.read(inputFile);

      if (template) {
        // Create Backlog Items
        const items = await agileService.createBacklogItems(template.items);
        logger.logHeader("Created Items");

        items.forEach((item) => logBacklogItem(logger, item));
      }
    });

  /**
   * Log a one-line backlog item description. Logs children recursively
   *
   * @param {Logger} logger Logger
   * @param {BacklogItem} item Backlog item
   * @param {string|undefined} parentId Parent ID if it has one
   */
  function logBacklogItem(logger: Logger, item: BacklogItem, parentId?: string): void {
    const { id, name, children, url } = item;
    const childOf = parentId ? ` (Child of ${parentId})` : "";
    const wrappedUrl = url ? ` (${url})` : "";
    logger.log(`${id}${childOf} - ${name}${wrappedUrl}`);
    if (children) {
      for (const child of children) {
        logBacklogItem(logger, child, id);
      }
    }
  }
};
