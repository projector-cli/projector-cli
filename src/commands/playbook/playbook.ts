import { Command } from "../../extensions";
import { playbookTemplateCommandFactory } from ".";
import { playbookAddCommandFactory } from "./add";
import { playbookRemoveCommandFactory } from "./remove";
import { playbookDeselectCommandFactory } from "./deselect";
import { playbookSelectCommandFactory } from "./select";
import { playbookStatusCommandFactory } from "./status";

export const playbookCommandFactory = (): Command => {
  const list = playbookStatusCommandFactory();

  list.name("list").description("See status.");
  return new Command()
    .name("playbook")
    .description("Interacting with the Code-With-Engineering Playbook")
    .addSubCommand(playbookTemplateCommandFactory())
    .addSubCommand(playbookAddCommandFactory())
    .addSubCommand(playbookDeselectCommandFactory())
    .addSubCommand(list)
    .addSubCommand(playbookRemoveCommandFactory())
    .addSubCommand(playbookSelectCommandFactory())
    .addSubCommand(playbookStatusCommandFactory())
    .addPhoneTree();
};
