import { Command } from "../../extensions";
import { playbookTemplateCommandFactory } from ".";
import { playbookSelectCommandFactory } from "./select";
import { playbookDeselectCommandFactory } from "./deselect";

export const playbookCommandFactory = (): Command => {
  return new Command()
    .name("playbook")
    .description("Interacting with the Code-With-Engineering Playbook")
    .addSubCommand(playbookTemplateCommandFactory())
    .addSubCommand(playbookSelectCommandFactory())
    .addSubCommand(playbookDeselectCommandFactory())
    .addPhoneTree();
};
