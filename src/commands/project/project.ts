import { Command } from "../../extensions";
import { projectSprintsCommandFactory, projectTemplateCommandFactory } from ".";

export const projectCommandFactory = (): Command => {
  return new Command()
    .name("project")
    .description("Interacting with a target project")
    .addSubCommand(projectSprintsCommandFactory())
    .addSubCommand(projectTemplateCommandFactory())
    .addPhoneTree();
};
