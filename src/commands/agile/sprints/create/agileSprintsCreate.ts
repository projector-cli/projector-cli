import { Command } from "../../../../extensions";
import { AgileProviderOptions, ServiceCollection } from "../../../../models";

export const agileSprintsCreateCommandFactory = (): Command => {
  return new Command<AgileProviderOptions>()
    .name("create")
    .description("Create Sprints with Agile Provider")
    .addAgileProviderOptions()
    .addAction(async (serviceCollection: ServiceCollection, options: AgileProviderOptions) => {
      const { getAgileService } = serviceCollection;
      const agileService = getAgileService(options);
      await agileService.createSprints();
    });
};
