import { Command } from "../../extensions";
import { playbookTemplateCommandFactory } from ".";
import { playbookAddCommandFactory } from "./add";
import { playbookRemoveCommandFactory } from "./remove";
import { playbookDeselectCommandFactory } from "./deselect";
import { playbookSelectCommandFactory } from "./select";

export const playbookCommandFactory = (): Command => {
  return new Command()
    .name("playbook")
    .description("Interacting with the Code-With-Engineering Playbook")
    .addSubCommand(playbookTemplateCommandFactory())
    .addSubCommand(playbookAddCommandFactory())
    .addSubCommand(playbookDeselectCommandFactory())
    .addSubCommand(playbookRemoveCommandFactory())
    .addSubCommand(playbookSelectCommandFactory())
    .addPhoneTree();
};
