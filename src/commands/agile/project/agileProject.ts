import { Command } from "../../../extensions";
import { agileProjectCreateCommandFactory, agileProjectDeleteCommandFactory } from ".";

export const agileProjectCommandFactory = (): Command => {
  return new Command()
    .name("project")
    .description("Project Management")
    .addSubCommand(agileProjectCreateCommandFactory())
    .addSubCommand(agileProjectDeleteCommandFactory())
    .addPhoneTree();
};
