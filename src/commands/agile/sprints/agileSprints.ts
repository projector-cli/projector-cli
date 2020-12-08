import { agileSprintsCreateCommandFactory } from ".";
import { Command } from "../../../extensions";

export const agileSprintsCommandFactory = (): Command => {
  return new Command()
    .name("sprints")
    .description("Sprint Management")
    .addSubCommand(agileSprintsCreateCommandFactory())
    .addPhoneTree();
};
