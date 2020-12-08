import { RepoServiceProvider } from "../services";
import { ModelSimulator, ServiceSimulator, SimulatorRepoService } from "../test";
import { RepoServiceFactory } from "./repoServiceFactory";

describe("Repo Service Factory", () => {
  it("registers a provider and instantiates instance", () => {
    // Act
    RepoServiceFactory.register(RepoServiceProvider.Simulator, SimulatorRepoService);

    // Assert
    expect(
      RepoServiceFactory.get(
        ModelSimulator.createTestRepoProviderOptions(),
        ServiceSimulator.createTestObjectService<string>(),
      ),
    ).toBeDefined();
  });
});
