import { Command } from "../../extensions";
import { playbookTemplateCommandFactory } from ".";

export const playbookCommandFactory = (): Command => {
  return new Command()
    .name("playbook")
    .description("Interacting with the Code-With-Engineering Playbook")
    .addSubCommand(playbookTemplateCommandFactory())
    .addPhoneTree();
};
