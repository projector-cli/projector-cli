import { Command } from "../../extensions";
import { repoCreateCommandFactory } from ".";

export const repoCommandFactory = (): Command => {
  return new Command()
    .name("repo")
    .description("Repository management")
    .addSubCommand(repoCreateCommandFactory())
    .addPhoneTree();
};
