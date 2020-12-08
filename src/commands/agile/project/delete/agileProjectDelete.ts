import { Command } from "../../../../extensions";
import { AgileProviderOptions, ServiceCollection } from "../../../../models";

export interface ProjectDeleteOptions extends AgileProviderOptions {
  projectName: string;
}

export const agileProjectDeleteCommandFactory = (): Command => {
  return new Command()
    .name("delete")
    .description("Delete Project with Agile Provider")
    .addAgileProviderOptions()
    .addAction(async (serviceCollection: ServiceCollection, options: ProjectDeleteOptions) => {
      const { logger, getAgileService, inputService } = serviceCollection;
      const agileService = getAgileService(options);
      const { projectName } = options;

      const project = await agileService.getProject(projectName);

      if (!project) {
        throw new Error(`Cannot find project ${projectName}`);
      }

      if (await inputService.confirmAction()) {
        logger.log("\nDeleting project...");
        await agileService.deleteProject(project);
        logger.log(`Agile project ${projectName} has been deleted`);
      } else {
        logger.log("Operation cancelled");
      }
    });
};
