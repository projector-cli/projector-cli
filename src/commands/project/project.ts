import { Command } from "../../extensions";
import { projectSprintsCommandFactory, projectTemplateCommandFactory } from ".";

export const projectCommandFactory = (): Command => {
  return new Command()
    .name("playbook")
    .description("Interacting with the Code-With-Engineering Playbook")
    .addSubCommand(projectSprintsCommandFactory())
    .addSubCommand(projectTemplateCommandFactory())
    .addPhoneTree();
};
