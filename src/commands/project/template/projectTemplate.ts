import { projectTemplateDeployCommandFactory, projectTemplateImportCommandFactory } from ".";
import { Command } from "../../../extensions";

export const projectTemplateCommandFactory = (): Command => {
  return new Command()
    .name("template")
    .description("Template Management")
    .addSubCommand(projectTemplateDeployCommandFactory())
    .addSubCommand(projectTemplateImportCommandFactory())
    .addPhoneTree();
};
