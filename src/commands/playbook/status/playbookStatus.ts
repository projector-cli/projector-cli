import { FileConstants } from "../../../constants";
import { Command } from "../../../extensions";
import { ServiceCollection } from "../../../models";

export interface PlaybookStatusOptions {
  active: boolean;
  location: boolean;
  templatesPath: boolean;
  token: boolean;
  verbose: boolean;
}

export const playbookStatusCommandFactory = (): Command<PlaybookStatusOptions> => {
  return new Command<PlaybookStatusOptions>()
    .name("status")
    .description("Check the status of playbooks.")
    .option("-a --active", "Status includes activity.")
    .option("-l --location", "Status includes location.")
    .option("-p --templatesPath", "Status includes templatesPath.")
    .option("-t --token", "Status includes whether the playbook has an associated token.")
    .option("-v --verbose", "Status includes everything.")
    .addAction(async (serviceCollection: ServiceCollection, options: PlaybookStatusOptions) => {
      const { configurationService, logger } = serviceCollection;

      const { active, location, templatesPath, token, verbose } = options;

      const playbooks = await configurationService.getPlaybooks();

      logger.log(`${playbooks.length} playbook${playbooks.length == 1 ? "" : "s"} found:`);

      playbooks.forEach((playbook) => {
        const playbookStatus = `  playbook: ${playbook.playbookName}`;
        const playbookStatusWithLocation = playbookStatus.concat(
          location || verbose
            ? ` @ ${typeof playbook.location === "string" ? playbook.location : playbook.location.href}`
            : "",
        );
        const playbookStatusWithActivity = playbookStatusWithLocation.concat(
          active || verbose ? ` is ${!!playbook.isActive ? "" : "not "}active` : "",
        );
        const playbookStatusWithTemplatesPath = playbookStatusWithActivity.concat(
          templatesPath || verbose
            ? ` is using ${playbook.templatesPath ?? FileConstants.templatesPath} as a templates path`
            : "",
        );
        const playbookStatusWithToken = playbookStatusWithTemplatesPath.concat(
          token || verbose ? `${!!playbook.token ? " has" : " does not have"} a token` : "",
        );
        logger.log(playbookStatusWithToken);
      });
    });
};
