import { Command } from "../../../extensions";
import { ServiceCollection } from "../../../models";

export interface PlaybookDeselectOptions {
  playbook: string;
  all?: boolean;
}

export const playbookDeselectCommandFactory = (): Command => {
  return new Command<PlaybookDeselectOptions>()
    .name("deselect")
    .description("Deselect a playbook.")
    .optionInteractive({
      shortName: "-a",
      longName: "--all",
      description: "If true, deselects all playbooks.",
      prompt: "Deslect all?",
    })
    .optionInteractive({
      shortName: "-p",
      longName: "--playbook",
      description: "The name of the playbook to deselect.",
      prompt: "Which playbook would you like to deselect?",
      choices: async (services: ServiceCollection) => {
        const { configurationService } = services;
        return (await configurationService.getPlaybooks()).map((playbook) => playbook.playbookName);
      },
    })
    .addAction(async (serviceCollection: ServiceCollection, options: PlaybookDeselectOptions) => {
      const { configurationService } = serviceCollection;

      const { playbook, all } = options;

      if (all) {
        const playbooks = await configurationService.getPlaybooks();
        playbooks.forEach(async (playbook) => await configurationService.deselectPlaybook(playbook.playbookName));
      } else {
        configurationService.deselectPlaybook(playbook);
      }
    });
};
