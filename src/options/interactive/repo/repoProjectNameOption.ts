import { ConfigKey } from "../../../constants";
import { OptionInteractive } from "../../../models";
import { RepoServiceProvider } from "../../../services";

export const repoProjectNameInteractiveOption: OptionInteractive = {
  shortName: "-p",
  longName: "--project-name",
  description: "Project name for your Repo Provider",
  configKey: ConfigKey.AgileProjectName,
  repoServiceProviders: [RepoServiceProvider.AzureDevOps],
  prompt: "What's the name of your project within the Repo Service Provider?",
};
