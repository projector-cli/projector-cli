import { ConfigKey } from "../../../constants";
import { OptionInteractive } from "../../../models";
import { RepoServiceProvider } from "../../../services";

export const repoProviderInteractiveOption: OptionInteractive = {
  shortName: "-r",
  longName: "--repo-provider",
  description: "Repo Service Provider",
  configKey: ConfigKey.RepoServiceProvider,
  prompt: "Which Repo Provider are you using?",
  choices: [RepoServiceProvider.AzureDevOps, RepoServiceProvider.GitHub],
};
