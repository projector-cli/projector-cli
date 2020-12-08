import { ConfigKey } from "../../../constants";
import { OptionInteractive } from "../../../models";

export const repoBaseUrlInteractiveOption: OptionInteractive = {
  shortName: "-u",
  longName: "--base-url",
  description:
    "Base URL for Agile Service Provider. Be sure to include the organization name (e.g. https://dev.azure.com/microsoft or https://github.com/microsoft)",
  configKey: ConfigKey.AgileBaseUrl,
  prompt:
    "Please provide the base url for your Agile Service Provider (e.g. https://dev.azure.com/microsoft or https://github.com/microsoft)",
};
