import { ConfigKey } from "../../../constants";
import { OptionInteractive } from "../../../models";

export const playbookOptionalAccessTokenInteractiveOption: OptionInteractive = {
  shortName: "-p",
  longName: "--playbook-access-token",
  description: "Optional GitHub access token. Authorized requests have higher request limits",
  configKey: ConfigKey.PlaybookAccessToken,
  prompt: "For higher request limits, please provide a GitHub access token. This is optional",
};
