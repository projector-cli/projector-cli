import { Command } from "../extensions";
import { registerProviders } from "../initialization";
import { playbookCommandFactory } from "./playbook";
import { projectCommandFactory } from "./project";
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
    .addSubCommand(playbookCommandFactory())
    .addSubCommand(projectCommandFactory())
    .addSubCommand(versionCommandFactory())
    .addPhoneTree();
};
