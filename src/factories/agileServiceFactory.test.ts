import { AgileServiceProvider } from "../services";
import { ServiceSimulator, SimulatorAgileService } from "../test";
import { AgileServiceFactory } from "./agileServiceFactory";

describe("Agile Service Factory", () => {
  it("registers a provider and instantiates instance", () => {
    // Act
    AgileServiceFactory.register(AgileServiceProvider.Simulator, SimulatorAgileService);

    // Assert
    expect(
      AgileServiceFactory.get(
        {
          agileProvider: AgileServiceProvider.Simulator,
          accessToken: "token",
          baseUrl: "https://url.com",
          projectName: "myproject",
        },
        ServiceSimulator.createTestInputService(),
        ServiceSimulator.createTestLogger(),
      ),
    ).toBeDefined();
  });
});
