import { Command } from "../../../extensions";
import { ServiceCollection } from "../../../models";

export interface PlaybookRemoveOptions {
  playbook: string;
}

export const playbookRemoveCommandFactory = (): Command<PlaybookRemoveOptions> => {
  return new Command<PlaybookRemoveOptions>()
    .name("remove")
    .description("Remove a playbook.")
    .optionInteractive({
      shortName: "-p",
      longName: "--playbook",
      description: "The name of the playbook to remove.",
      prompt: "Which playbook would you like to remove?",
      choices: async (services: ServiceCollection) => {
        const { configurationService } = services;
        return (await configurationService.getPlaybooks()).map((playbook) => playbook.playbookName);
      },
    })
    .addAction(async (serviceCollection: ServiceCollection, options: PlaybookRemoveOptions) => {
      const { configurationService } = serviceCollection;

      const { playbook } = options;

      await configurationService.removePlaybook(playbook);
    });
};
