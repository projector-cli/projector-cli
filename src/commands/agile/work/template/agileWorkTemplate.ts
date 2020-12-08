import { Command } from "../../../../extensions";
import { agileWorkTemplateInitCommandFactory, agileWorkTemplateListCommandFactory } from ".";

export const agileWorkTemplateCommandFactory = (): Command => {
  return new Command()
    .name("template")
    .description("Work Item Templates")
    .addSubCommand(agileWorkTemplateInitCommandFactory())
    .addSubCommand(agileWorkTemplateListCommandFactory())
    .addPhoneTree();
};
