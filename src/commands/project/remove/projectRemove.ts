import { Command } from "../../../extensions";
import { ServiceCollection } from "../../../models";

export interface ProjectRemoveOptions {
  project: string;
}

export const projectRemoveCommandFactory = (): Command<ProjectRemoveOptions> => {
  return new Command<ProjectRemoveOptions>()
    .name("remove")
    .description("Remove a project.")
    .optionInteractive({
      shortName: "-p",
      longName: "--project",
      description: "The name of the project to remove.",
      prompt: "Which project would you like to remove?",
      choices: async (services: ServiceCollection) => {
        const { configurationService } = services;
        return (await configurationService.getProjects()).map((project) => project.projectName);
      },
    })
    .addAction(async (serviceCollection: ServiceCollection, options: ProjectRemoveOptions) => {
      const { configurationService } = serviceCollection;

      const { project } = options;

      await configurationService.removeProject(project);
    });
};
