import { AgileService } from "../agile";
import { BacklogItem, BacklogItemType, Sprint } from "../../models";
import { ServiceSimulator, SimulatorAgileService } from "../../test";

describe("Base Agile Service", () => {
  it("calls abstract function to create backlog items and returns result", async () => {
    // Setup
    const createBacklogItems = jest.fn((items: BacklogItem[]) =>
      Promise.resolve(
        items.map((item: BacklogItem) => {
          return {
            ...item,
            id: "1",
          };
        }),
      ),
    );

    const createProviderSprints = jest.fn((sprints: Sprint[]) =>
      Promise.resolve(
        sprints.map((sprint: Sprint) => {
          return {
            ...sprint,
            id: "1",
          };
        }),
      ),
    );

    const inputService = ServiceSimulator.createTestInputService();
    const logger = ServiceSimulator.createTestLogger();

    const service: AgileService = new SimulatorAgileService(
      {
        createBacklogItems,
        createProviderSprints,
      },
      inputService,
      logger,
    );

    const backlogItems: BacklogItem[] = [
      {
        name: "Story 1",
        type: BacklogItemType.Story,
      },
      {
        name: "Story 2",
        type: BacklogItemType.Story,
      },
    ];

    // Act
    const result = await service.createBacklogItems(backlogItems);

    // Assert
    expect(createBacklogItems).toBeCalledTimes(1);
    expect(result).toEqual(
      backlogItems.map((item) => {
        return {
          ...item,
          id: "1",
        };
      }),
    );
  });

  it.each([
    [3, 1, 3],
    [3, 13, 3],
    [9, 55, 9],
  ])(
    "generates %i sprints when sprint index is %i and number of sprints is %i",
    async (expected, startIndex, numberOfSprints) => {
      // Setup
      const inputService = ServiceSimulator.createTestInputService({
        confirmAnswer: true,
        answer: "4/23/2021",
        numberAnswer: numberOfSprints,
      });
      const logger = ServiceSimulator.createTestLogger();

      const createProviderSprints = jest.fn((sprints: Sprint[]) =>
        Promise.resolve(
          sprints.map((sprint: Sprint) => {
            return {
              ...sprint,
              id: "1",
            };
          }),
        ),
      );

      const service: AgileService = new SimulatorAgileService(
        {
          createProviderSprints,
        },
        inputService,
        logger,
      );

      // Act
      const createdSprints = await service.createSprints();

      // Assert
      expect(createProviderSprints).toHaveBeenCalledWith(expect.anything());
      expect(createdSprints).toHaveLength(expected);
    },
  );
});
