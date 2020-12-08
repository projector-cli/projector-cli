import { ConfigKey, NumberConstants } from "../../../../constants";
import { BacklogItem, Sprint } from "../../../../models";
import { hierarchicalBacklogItem } from "../../../../samples";
import { ServiceSimulator } from "../../../../test";
import { Config } from "../../../../utils";
import { AgileServiceProvider } from "../../agileServiceProvider";
import { GitHubAgileService } from "./gitHubAgileService";

interface MilestoneNumberHaver {
  milestoneNumber: string;
}

describe("GitHub Agile Service", () => {
  const inputService = ServiceSimulator.createTestInputService({
    confirmAnswer: true,
  });
  const logger = ServiceSimulator.createTestLogger();

  const service = new GitHubAgileService(
    {
      agileProvider: AgileServiceProvider.GitHub,
      accessToken: Config.getValue(ConfigKey.TestGitHubAccessToken),
      baseUrl: Config.getValue(ConfigKey.TestGitHubBaseUrl),
      projectName: Config.getValue(ConfigKey.TestGitHubRepoName),
    },
    inputService,
    logger,
  );

  it("can create and get hierarchical backlog items", async () => {
    const backlogItems = await service.createBacklogItems([hierarchicalBacklogItem]);
    expect(backlogItems).toHaveLength(1);

    // Check epic
    const expectedEpic = hierarchicalBacklogItem;
    const actualEpic = backlogItems[0];

    expect(actualEpic.id).toBeDefined();
    expect(actualEpic.name).toEqual(expectedEpic.name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-"));
    expect(actualEpic.description).toEqual(expectedEpic.description);
    expect(actualEpic.children).toBeDefined();
    expect(actualEpic.children).toHaveLength(expectedEpic.children!.length);

    // Check feature
    const expectedFeature = expectedEpic.children![0];
    const actualFeature = actualEpic.children![0];

    expect(actualFeature.id).toBeDefined();
    expect(actualFeature.name).toEqual(expectedFeature.name);
    expect(actualFeature.description).toEqual(expectedFeature.description);
    expect(actualFeature.children).toBeDefined();
    expect(actualFeature.children).toHaveLength(expectedFeature.children!.length);

    // Check story
    const expectedStory = expectedFeature.children![0];
    const actualStory = actualFeature.children![0];

    expect(actualStory.id).toBeDefined();
    expect(actualStory.name).toEqual(expectedStory.name);
    expect(actualStory.description).toContain(expectedStory.description);

    // We do not map children back to the children items since they are included
    // in the description of the issue
    expect(actualStory.children).toBeUndefined();
    expectedStory.children!.forEach((child: BacklogItem) => {
      expect(actualStory.description).toContain(child.name);
      expect(child.id).toBeUndefined();
    });
    expectedStory.acceptanceCriteria!.forEach((ac: string) => {
      expect(actualStory.description).toContain(ac);
    });

    const fetchedStories = await service.getBacklogItems([actualStory.id!]);
    expect(fetchedStories).toHaveLength(1);
    expect(fetchedStories[0].name).toEqual(expectedStory.name);
  }, 60000);

  it("can create and delete sprints", async () => {
    const now = new Date();
    const numSprints = 1;

    const sprintsToCreate: Sprint[] = [];

    for (let i = 1; i <= numSprints; i++) {
      const finishDate = new Date(now.getTime() + NumberConstants.millisecondsInADay * 7 * i);
      sprintsToCreate.push({
        name: `Sprint ${i}`,
        finishDate,
      });
    }

    const createdSprints = await service.createSprints(sprintsToCreate);
    expect(createdSprints.length).toBeTruthy();
    expect(createdSprints.length).toEqual(sprintsToCreate.length);

    const millisecondsInAnHour = 60 * 60 * 1000;

    createdSprints.forEach((actual: Sprint, index: number) => {
      const expected = sprintsToCreate[index];

      expect(actual.name).toEqual(expected.name);
      expect(actual.description).toEqual(expected.description);

      expect(actual.finishDate).toBeDefined();

      const hoursDifference =
        Math.abs(expected.finishDate!.getTime() - actual.finishDate!.getTime()) / millisecondsInAnHour;

      expect(hoursDifference).toBeLessThan(24);
      expect(actual.id).toBeDefined();
    });

    for (const createdSprint of createdSprints) {
      const milestoneNumberHaver = createdSprint.metadata as MilestoneNumberHaver;
      await service.deleteSprint(milestoneNumberHaver.milestoneNumber);
    }
  }, 60000);
});
