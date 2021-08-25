import { FileConstants } from "../../../constants";
import { Command } from "../../../extensions";
import { PlaybookConfiguration, ServiceCollection } from "../../../models";

export const playbookAddCommandFactory = (): Command<PlaybookConfiguration> => {
  return new Command<PlaybookConfiguration>()
    .name("add")
    .description("Add a playbook.")
    .optionInteractive({
      shortName: "-p",
      longName: "--playbook-name",
      description: "The name of the playbook to add.",
      prompt: "What would you like to call this new playbook?",
    })
    .optionInteractive({
      shortName: "-l",
      longName: "--location",
      description: "The location of the playbook, either a URL or a local path.",
      prompt:
        "Where can we find the playbook? Please provide the full URL or path of the directory containing your .projector directory",
    })
    .optionInteractive({
      shortName: "-T",
      longName: "--token",
      description: "A token with read permissions to the playbook.",
      prompt: "Please provide a personal access token for this playbook",
    })
    .optionInteractive({
      shortName: "-t",
      longName: "--templates-path",
      description: "The path where backlog item templates can be found.",
      prompt: "Where in your .projector directory do you store your packaged sprints/backlog item templates?",
      defaultValue: FileConstants.templatesPath,
    })
    .optionInteractive({
      shortName: "-a",
      longName: "--is-active",
      description: "If true, activates this playbook immediately.",
      prompt: "Should this playbook be activated immediately? If true, yes, if false, no",
      defaultValue: "true",
    })
    .addAction(async (serviceCollection: ServiceCollection, options: PlaybookConfiguration) => {
      const { configurationService } = serviceCollection;

      await configurationService.addPlaybook(options);
    });
};
