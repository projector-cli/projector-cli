import { AgileConstants, NumberConstants } from "../../../../constants";
import { Command } from "../../../../extensions";
import { ServiceCollection, Sprint } from "../../../../models";
import { DateUtils } from "../../../../utils";

export const projectSprintsCreateCommandFactory = (): Command => {
  return new Command()
    .name("create")
    .description("Create Sprints in Projects")
    .addAction(async (serviceCollection: ServiceCollection) => {
      const { activeProjectServiceFactoryMap, inputService, logger } = serviceCollection;
      const initialStartDate = await inputService.askQuestion(
        "What date would you like to start?",
        DateUtils.toNumberDateString(DateUtils.nextMonday()),
      );

      const lengthOfSprintInDays = await inputService.askNumberQuestion(
        "How many days would you like your sprints to be?",
        AgileConstants.defaultSprintLength,
      );

      const numberOfSprints = await inputService.askNumberQuestion(
        "How many sprints would you like?",
        AgileConstants.defaultNumberOfSprints,
      );

      const daysBetweenSprints = await inputService.askNumberQuestion(
        "How many days would you like between sprints?",
        AgileConstants.defaultNumberOfDaysBetweenSprints,
      );

      const indexStart = await inputService.askNumberQuestion("What should the ordinal of the initial sprint be?", 0);

      const sprints: Sprint[] = [];

      const timezoneOffset = new Date().getTimezoneOffset() * NumberConstants.millisecondsInAMinute;

      let startDate = new Date(Date.parse(initialStartDate) + timezoneOffset);

      for (let i = indexStart; i < numberOfSprints + indexStart; i++) {
        const finishDate = DateUtils.addDays(startDate, lengthOfSprintInDays - 1);
        sprints.push({
          name: `Sprint ${i}`,
          startDate,
          finishDate,
        });
        startDate = DateUtils.addDays(finishDate, daysBetweenSprints + 1);
      }

      logger.log("The following sprints will be created:\n");
      sprints.forEach((sprint: Sprint) => {
        const { name, startDate, finishDate } = sprint;
        logger.log(`${name}:\t${DateUtils.toSimpleDateString(startDate)}\t${DateUtils.toSimpleDateString(finishDate)}`);
      });
      logger.log("In these projects:\n");
      for (const activeProject in activeProjectServiceFactoryMap) {
        logger.log(activeProject);
      }

      if (await inputService.confirmAction()) {
        logger.log("\nCreating sprints...");
        activeProjectServiceFactoryMap.forEach((factory) => factory().createSprints(sprints));
        logger.log("\nCreated sprints");
      } else {
        logger.log("Operation cancelled");
      }
    });
};
