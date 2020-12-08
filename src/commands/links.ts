import config from "config";
import { Command } from "../extensions";

export const linksCommandFactory = (): Command => {
  return new Command()
    .name("links")
    .description("Commonly used links in CSE")
    .addLinkCommands(config.get("links"))
    .addPhoneTree();
};
