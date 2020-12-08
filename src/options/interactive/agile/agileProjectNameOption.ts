import { ConfigKey } from "../../../constants";
import { OptionInteractive } from "../../../models";

export const agileProjectNameInteractiveOption: OptionInteractive = {
  shortName: "-p",
  longName: "--project-name",
  description: "Project name for your Agile Provider",
  configKey: ConfigKey.AgileProjectName,
  prompt: "What's the name of your project within the Agile Service Provider?",
};
