import { Command } from "../../../extensions";
import { RepoProviderOptions, ServiceCollection } from "../../../models";
import { repoNameInteractiveOption } from "../../../options";

export interface RepoCreateOptions extends RepoProviderOptions {
  repoName: string;
}

export const repoCreateCommandFactory = (): Command => {
  return new Command<RepoCreateOptions>()
    .name("create")
    .description("Create a repository")
    .addRepoProviderOptions()
    .optionInteractive(repoNameInteractiveOption)
    .addAction(async (services: ServiceCollection, options: RepoCreateOptions) => {
      const { logger, getRepoService } = services;
      const repoService = getRepoService(options);
      const { repoName } = options;
      const createdRepo = await repoService.createRepo(repoName);
      const { name, id, remoteUrl } = createdRepo;
      logger.log(`${id} - ${name} ${remoteUrl}`);
    });
};
