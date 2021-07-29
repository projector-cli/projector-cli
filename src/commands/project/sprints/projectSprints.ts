import { projectSprintsCreateCommandFactory } from ".";
import { Command } from "../../../extensions";

export const projectSprintsCommandFactory = (): Command => {
  return new Command()
    .name("sprints")
    .description("Sprint Management")
    .addSubCommand(projectSprintsCreateCommandFactory())
    .addPhoneTree();
};
