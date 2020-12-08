import { ConfigKey } from "../../../constants";
import { OptionInteractive } from "../../../models";

export const repoAccessTokenInteractiveOption: OptionInteractive = {
  shortName: "-t",
  longName: "--access-token",
  description: "Access token for your Agile Service Provider",
  configKey: ConfigKey.AgileAccessToken,
  prompt: "Please provide an access token for your Agile Service Provider",
};
