import { Command } from "../../../extensions";
import { playbookTemplateCopyCommandFactory, playbookTemplateListCommandFactory } from ".";

export const playbookTemplateCommandFactory = (): Command => {
  return new Command()
    .name("template")
    .description("Discover and use templates from the code-with engineering playbook")
    .addSubCommand(playbookTemplateCopyCommandFactory())
    .addSubCommand(playbookTemplateListCommandFactory())
    .addPhoneTree();
};
