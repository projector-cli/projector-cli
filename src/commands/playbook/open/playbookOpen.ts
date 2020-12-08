import { Command, urlCommand } from "../../../extensions";
import { Config } from "../../../utils";

export const playbookOpenCommandFactory = (): Command => urlCommand(Config.getLink("playbook")).name("open");
