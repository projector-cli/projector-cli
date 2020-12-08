import { ConfigKey } from "../../../constants";
import { OptionInteractive } from "../../../models";
import { AgileServiceProvider } from "../../../services";

export const agileProviderInteractiveOption: OptionInteractive = {
  shortName: "-a",
  longName: "--agile-provider",
  description: "Agile Provider",
  configKey: ConfigKey.AgileServiceProvider,
  prompt: "Which Agile Provider are you using?",
  choices: [AgileServiceProvider.AzureDevOps, AgileServiceProvider.GitHub, AgileServiceProvider.Jira],
};
