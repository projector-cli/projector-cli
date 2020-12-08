import { playbookIssueCreateCommandFactory, playbookIssuesOpenCommandFactory } from ".";
import { Command } from "../../../extensions";

export const playbookIssuesCommandFactory = (): Command => {
  return new Command()
    .name("issues")
    .description("Interacting with issues in the code-with engineering playbook")
    .addSubCommand(playbookIssueCreateCommandFactory())
    .addSubCommand(playbookIssuesOpenCommandFactory())
    .addPhoneTree();
};
