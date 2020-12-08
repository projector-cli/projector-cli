import { Command, urlCommand } from "../../../../extensions";
import { Config } from "../../../../utils";

export const playbookIssuesOpenCommandFactory = (): Command => {
  return urlCommand(Config.getLink("playbook"), "/issues")
    .name("open")
    .description("View issues in the code-with engineering playbook");
};
