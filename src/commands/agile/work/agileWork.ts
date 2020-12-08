import { agileWorkCreateCommandFactory, agileWorkImportCommandFactory, agileWorkTemplateCommandFactory } from ".";
import { Command } from "../../../extensions";

export const agileWorkCommandFactory = (): Command => {
  return new Command()
    .name("work")
    .description("Work Item Management")
    .addSubCommand(agileWorkCreateCommandFactory())
    .addSubCommand(agileWorkImportCommandFactory())
    .addSubCommand(agileWorkTemplateCommandFactory())
    .addPhoneTree();
};
