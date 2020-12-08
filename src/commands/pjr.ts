import { Command } from "../extensions";
import { registerProviders } from "../initialization";
import { agileCommandFactory } from "./agile";
import { linksCommandFactory } from "./links";
import { playbookCommandFactory } from "./playbook";
import { repoCommandFactory } from "./repo";
import { versionCommandFactory } from "./version";

export const pjrCommandFactory = (): Command => {
  return new Command()
    .description("Root command for the Projector CLI")
    .name("pjr")
    .initialize(() => {
      registerProviders();
    })
    .asciiArt("projector")
    .passCommandToAction(false)
    .addSubCommand(agileCommandFactory())
    .addSubCommand(linksCommandFactory())
    .addSubCommand(playbookCommandFactory())
    .addSubCommand(repoCommandFactory())
    .addSubCommand(versionCommandFactory())
    .addPhoneTree();
};
