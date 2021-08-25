import { Command } from "../../../../extensions";
import { AgileProviderOptions, ServiceCollection } from "../../../../models";

export const projectSprintsCreateCommandFactory = (): Command => {
  return new Command<AgileProviderOptions>()
    .name("create")
    .description("Create Sprints in a Project")
    .addAction(async (serviceCollection: ServiceCollection, options: AgileProviderOptions) => {
      const { getAgileService } = serviceCollection;
      const agileService = getAgileService(options);
      await agileService.createSprints();
    });
};
