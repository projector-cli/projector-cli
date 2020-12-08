import { ServiceSimulator, SimulatorAgileService, CliSimulator } from "../../../../test";
import { agileSprintsCreateCommandFactory } from "./agileSprintsCreate";

describe("Agile Sprints Create Command", () => {
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

    const agileSprintsCreate = agileSprintsCreateCommandFactory();

    await agileSprintsCreate.setServiceCollection(serviceCollection).parseAsync(CliSimulator.createAgileArgs());
    expect(createSprints).toBeCalled();
  });
});
