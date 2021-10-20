import { Command } from "../../extensions";
import { projectSprintsCommandFactory, projectTemplateCommandFactory } from ".";
import { projectAddCommandFactory } from "./add";
import { projectDeselectCommandFactory } from "./deselect";
import { projectRemoveCommandFactory } from "./remove";
import { projectSelectCommandFactory } from "./select";
import { projectStatusCommandFactory } from "./status";

export const projectCommandFactory = (): Command => {
  const list = projectStatusCommandFactory();

  list.name("list").description("See status.");
  return new Command()
    .name("project")
    .description("Interacting with a target project")
    .addSubCommand(projectAddCommandFactory())
    .addSubCommand(projectDeselectCommandFactory())
    .addSubCommand(list)
    .addSubCommand(projectRemoveCommandFactory())
    .addSubCommand(projectSelectCommandFactory())
    .addSubCommand(projectSprintsCommandFactory())
    .addSubCommand(projectStatusCommandFactory())
    .addSubCommand(projectTemplateCommandFactory())
    .addPhoneTree();
};
