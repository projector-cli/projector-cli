import { ServiceSimulator, SimulatorAgileService, CliSimulator } from "../../../../test";
import { projectSprintsCreateCommandFactory } from "./projectSprintsCreate";

describe("Project Sprints Create Command", () => {
  it("creates sprints", async () => {
    const createSprints = jest.fn();
    const inputService = ServiceSimulator.createTestInputService({
      confirmAnswer: true,
      answer: "4/23/2021",
      numberAnswer: 5,
    });

    const agileService = new SimulatorAgileService(
      {
        createProviderSprints: createSprints,
      },
      inputService,
      ServiceSimulator.createTestLogger(),
    );

    const serviceCollection = ServiceSimulator.createTestServiceCollection({
      agileService,
    });

    const projectSprintsCreate = projectSprintsCreateCommandFactory();

    await projectSprintsCreate.setServiceCollection(serviceCollection).parseAsync(CliSimulator.createArgs());
    expect(createSprints).toBeCalled();
  });
});
