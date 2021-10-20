import { Command } from "../../../extensions";
import { ServiceCollection } from "../../../models";

export interface ProjectSelectOptions {
  project: string;
  exclusive?: boolean;
}

export const projectSelectCommandFactory = (): Command<ProjectSelectOptions> => {
  return new Command<ProjectSelectOptions>()
    .name("select")
    .description("Select a project.")
    .optionInteractive({
      shortName: "-p",
      longName: "--project",
      description: "The name of the project to select.",
      prompt: "Which project would you like to select?",
      choices: async (services: ServiceCollection) => {
        const { configurationService } = services;
        return (await configurationService.getProjects()).map((project) => project.projectName);
      },
    })
    .optionInteractive({
      shortName: "-e",
      longName: "--exclusive",
      description: "If true, deselects other projects before selecting this one.",
      prompt: "Would you like to select this project exclusively?",
    })
    .addAction(async (serviceCollection: ServiceCollection, options: ProjectSelectOptions) => {
      const { configurationService } = serviceCollection;

      const { project, exclusive } = options;

      if (exclusive) {
        const projects = await configurationService.getProjects();
        projects.forEach(async (project) => await configurationService.deselectProject(project.projectName));
      }

      configurationService.selectProject(project);
    });
};
