import { Command } from "../../extensions";
import { agileProjectCommandFactory, agileSprintsCommandFactory, agileWorkCommandFactory } from ".";

export const agileCommandFactory = (): Command => {
  return new Command()
    .name("agile")
    .description("Agile Configuration Management")
    .addSubCommand(agileSprintsCommandFactory())
    .addSubCommand(agileProjectCommandFactory())
    .addSubCommand(agileWorkCommandFactory())
    .addPhoneTree();
};
