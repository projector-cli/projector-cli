import { Command } from "../../../extensions";
import { ServiceCollection } from "../../../models";

export interface PlaybookSelectOptions {
  playbook: string;
  exclusive?: boolean;
}

export const playbookSelectCommandFactory = (): Command<PlaybookSelectOptions> => {
  return new Command<PlaybookSelectOptions>()
    .name("select")
    .description("Select a playbook.")
    .optionInteractive({
      shortName: "-p",
      longName: "--playbook",
      description: "The name of the playbook to select.",
      prompt: "Which playbook would you like to select?",
      choices: async (services: ServiceCollection) => {
        const { configurationService } = services;
        return (await configurationService.getPlaybooks()).map((playbook) => playbook.playbookName);
      },
    })
    .optionInteractive({
      shortName: "-e",
      longName: "--exclusive",
      description: "If true, deselects other playbooks before selecting this one.",
      prompt: "Would you like to select this playbook exclusively?",
    })
    .addAction(async (serviceCollection: ServiceCollection, options: PlaybookSelectOptions) => {
      const { configurationService } = serviceCollection;

      const { playbook, exclusive } = options;

      if (exclusive) {
        const playbooks = await configurationService.getPlaybooks();
        playbooks.forEach(async (playbook) => await configurationService.deselectPlaybook(playbook.playbookName));
      }

      configurationService.selectPlaybook(playbook);
    });
};
