import { Command } from "../../../extensions";
import { playbookTemplateInitCommandFactory, playbookTemplateListCommandFactory } from ".";

export const playbookTemplateCommandFactory = (): Command => {
  return new Command()
    .name("template")
    .description("Discover and use templates from the code-with engineering playbook")
    .addSubCommand(playbookTemplateInitCommandFactory())
    .addSubCommand(playbookTemplateListCommandFactory())
    .addPhoneTree();
};
