import { RepoServiceProvider } from "../services";
import { ModelSimulator, SimulatorRepoService } from "../test";
import { RepoServiceFactory } from "./repoServiceFactory";

describe("Repo Service Factory", () => {
  it("registers a provider and instantiates instance", () => {
    // Act
    RepoServiceFactory.register(RepoServiceProvider.Simulator, SimulatorRepoService);

    // Assert
    expect(RepoServiceFactory.get(ModelSimulator.createTestRepoProviderOptions())).toBeDefined();
  });
});
