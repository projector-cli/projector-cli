import { FileConstants } from "../../../constants";
import { Command } from "../../../extensions";
import { ServiceCollection } from "../../../models";

export interface ProjectStatusOptions {
  active: boolean;
  url: boolean;
  token: boolean;
  verbose: boolean;
}

export const projectStatusCommandFactory = (): Command<ProjectStatusOptions> => {
  return new Command<ProjectStatusOptions>()
    .name("status")
    .description("Check the status of projects.")
    .option("-a --active", "Status includes activity.")
    .option("-u --url", "Status includes URL.")
    .option("-t --token", "Status includes whether the project has an associated token.")
    .option("-v --verbose", "Status includes everything.")
    .addAction(async (serviceCollection: ServiceCollection, options: ProjectStatusOptions) => {
      const { configurationService, logger } = serviceCollection;

      const { active, url, token, verbose } = options;

      const projects = await configurationService.getProjects();

      logger.log(`${projects.length} project${projects.length == 1 ? "" : "s"} found:`);

      projects.forEach((project) => {
        const projectStatus = `  project: ${project.projectName}`;
        const projectStatusWithURL = projectStatus.concat(url || verbose ? ` @ ${project.url.toString()}` : "");
        const projectStatusWithActivity = projectStatusWithURL.concat(
          active || verbose ? ` is ${!!project.isActive ? "" : "not "}active` : "",
        );
        const projectStatusWithToken = projectStatusWithActivity.concat(
          token || verbose ? `${!!project.token ? " has" : " does not have"} a token` : "",
        );
        logger.log(projectStatusWithToken);
      });
    });
};
