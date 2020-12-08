import { ConfigKey } from "../../../constants";
import { OptionInteractive } from "../../../models";

export const repoNameInteractiveOption: OptionInteractive = {
  shortName: "-n",
  longName: "--repo-name",
  description: "Repo name",
  configKey: ConfigKey.RepoName,
  prompt: "What is the name of your repo?",
};
