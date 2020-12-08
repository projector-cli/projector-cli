import { Command } from "../extensions";
import { ServiceCollection } from "../models";
import { PackageJson } from "../utils";

export const versionCommandFactory = (): Command => {
  return new Command()
    .name("version")
    .description("Print current projector version")
    .addAction((serviceCollection: ServiceCollection) => {
      serviceCollection.logger.log(PackageJson.getVersion());
    });
};
