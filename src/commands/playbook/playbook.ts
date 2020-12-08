import { Command } from "../../extensions";
import { playbookIssuesCommandFactory, playbookTemplateCommandFactory } from ".";

export const playbookCommandFactory = (): Command => {
  return new Command()
    .name("playbook")
    .description("Interacting with the Code-With-Engineering Playbook")
    .addSubCommand(playbookIssuesCommandFactory())
    .addSubCommand(playbookTemplateCommandFactory())
    .addPhoneTree();
};
