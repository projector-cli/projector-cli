import { Command } from "../../../extensions";
import { ProjectConfiguration, ServiceCollection } from "../../../models";

export const projectAddCommandFactory = (): Command<ProjectConfiguration> => {
  return new Command<ProjectConfiguration>()
    .name("add")
    .description("Add a project.")
    .optionInteractive({
      shortName: "-p",
      longName: "--project-name",
      description: "The name of the project to add.",
      prompt: "What would you like to call this new project?",
    })
    .optionInteractive({
      shortName: "-u",
      longName: "--url",
      description: "The location of the project as a URL.",
      prompt: "What is the base URL of the project?",
    })
    .optionInteractive({
      shortName: "-t",
      longName: "--token",
      description: "A token with write permissions to the backlog at this URL.",
      prompt: "Please provide a personal access token for this project.",
    })
    .optionInteractive({
      shortName: "-a",
      longName: "--is-active",
      description: "Whether the project should be active.",
      prompt: "Activate this project immediately?",
      defaultValue: "true",
    })
    .addAction(async (serviceCollection: ServiceCollection, options: ProjectConfiguration) => {
      const { configurationService } = serviceCollection;

      await configurationService.addProject(options);
    });
};
