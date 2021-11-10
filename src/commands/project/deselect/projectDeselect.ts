import { Command } from "../../../extensions";
import { ServiceCollection } from "../../../models";

export interface ProjectDeselectOptions {
  project: string;
  all?: boolean;
}

export const projectDeselectCommandFactory = (): Command<ProjectDeselectOptions> => {
  return new Command<ProjectDeselectOptions>()
    .name("deselect")
    .description("Deselect a project.")
    .optionInteractive({
      shortName: "-p",
      longName: "--project",
      description: "The name of the project to deselect.",
      prompt: "Which project would you like to deselect?",
      choices: async (services: ServiceCollection) => {
        const { configurationService } = services;
        return (await configurationService.getProjects()).map((project) => project.projectName);
      },
    })
    .optionInteractive({
      shortName: "-a",
      longName: "--all",
      description: "If true, deselects all projects.",
      prompt: "Deslect all?",
    })
    .addAction(async (serviceCollection: ServiceCollection, options: ProjectDeselectOptions) => {
      const { configurationService } = serviceCollection;

      const { project, all } = options;

      if (all) {
        const projects = await configurationService.getProjects();
        projects.forEach(async (project) => await configurationService.deselectProject(project.projectName));
      } else {
        configurationService.deselectProject(project);
      }
    });
};
