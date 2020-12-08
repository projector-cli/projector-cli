import { ConfigKey, NumberConstants } from "../../constants";
import {
  AgileProviderOptions,
  AgileService,
  BacklogItem,
  InputService,
  Logger,
  Project,
  Sprint,
  SprintConfig,
} from "../../models";
import { Config, DateUtils } from "../../utils";

export abstract class BaseAgileService implements AgileService {
  constructor(protected config: AgileProviderOptions, protected inputService: InputService, protected logger: Logger) {}

  // Base functions

  public async createSprints(sprints?: Sprint[]): Promise<Sprint[]> {
    sprints = sprints || (await this.generateSprints());
    return this.confirmAndCreateSprints(sprints);
  }

  // Abstract functions

  // Backlog Items
  abstract getBacklogItems: (ids?: string[]) => Promise<BacklogItem[]>;
  abstract createBacklogItems: (items: BacklogItem[]) => Promise<BacklogItem[]>;
  abstract deleteBacklogItems: (ids: string[]) => Promise<void>;

  // Projects
  abstract createProject: (project: Project) => Promise<Project>;
  abstract getProject: (name: string) => Promise<Project | null>;
  abstract deleteProject: (project: Project) => Promise<boolean>;

  // Sprints
  abstract getSprint: (id: string) => Promise<Sprint>;
  abstract createProviderSprints: (sprints: Sprint[]) => Promise<Sprint[]>;
  abstract deleteSprint: (id: string) => Promise<void>;

  // Private functions

  private async generateSprints(): Promise<Sprint[]> {
    const sprintConfig = await this.createSprintConfig();
    const { startDate, lengthOfSprintInDays, numberOfSprints, daysBetweenSprints, sprintIndexStart } = sprintConfig;

    const indexStart: number = sprintIndexStart || Config.getValue(ConfigKey.AgileDefaultSprintStartIndex);

    const sprints: Sprint[] = [];

    const timezoneOffset = new Date().getTimezoneOffset() * NumberConstants.millisecondsInAMinute;

    let currentStartDate = new Date(Date.parse(startDate) + timezoneOffset);

    for (let i = indexStart; i < numberOfSprints + indexStart; i++) {
      const finishDate = DateUtils.addDays(currentStartDate, lengthOfSprintInDays - 1);
      sprints.push({
        name: `Sprint ${i}`,
        startDate: currentStartDate,
        finishDate,
      });
      currentStartDate = DateUtils.addDays(finishDate, daysBetweenSprints + 1);
    }
    return sprints;
  }

  private async createSprintConfig(): Promise<SprintConfig> {
    // Get start date
    const startDate = await this.inputService.askQuestion(
      "What date would you like to start?",
      DateUtils.toNumberDateString(DateUtils.nextMonday()),
    );

    // Get sprint length
    const sprintLength = await this.inputService.askNumberQuestion(
      "How long would you like your sprints to be?",
      Config.getValue(ConfigKey.AgileDefaultSprintLength),
    );

    // Get sprint count
    const sprintCount = await this.inputService.askNumberQuestion(
      "How many sprints would you like?",
      Config.getValue(ConfigKey.AgileDefaultNumberOfSprints),
    );

    // Get days between sprints
    const daysBetweenSprints = await this.inputService.askNumberQuestion(
      "How many days would you like between sprints?",
      Config.getValue(ConfigKey.AgileDefaultDaysBetweenSprints),
    );

    return {
      lengthOfSprintInDays: sprintLength,
      numberOfSprints: sprintCount,
      daysBetweenSprints,
      startDate,
    };
  }

  private async confirmAndCreateSprints(sprints: Sprint[]): Promise<Sprint[]> {
    this.logger.log("The following sprints will be created:\n");

    sprints.forEach((sprint: Sprint) => {
      const { name, startDate, finishDate } = sprint;
      this.logger.log(
        `${name}:\t${DateUtils.toSimpleDateString(startDate)}\t${DateUtils.toSimpleDateString(finishDate)}`,
      );
    });

    if (await this.inputService.confirmAction()) {
      this.logger.log("\nCreating sprints...");
      const createdSprints = await this.createProviderSprints(sprints);
      this.logger.log("\nCreated sprints");
      return createdSprints;
    } else {
      this.logger.log("Operation cancelled");
      return [];
    }
  }
}
