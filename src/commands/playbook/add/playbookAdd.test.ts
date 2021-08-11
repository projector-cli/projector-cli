import { ServiceCollection } from "../../../models";
import { ConfigurationService } from "../../../services";
import { CliSimulator, ServiceSimulator } from "../../../test";
import { playbookAddCommandFactory } from "../add";

describe("Playbook Add Command", () => {
  let configurationService: ConfigurationService;
  let serviceCollection: ServiceCollection;

  beforeEach(() => {
    configurationService = ServiceSimulator.createTestConfigurationService();
    serviceCollection = ServiceSimulator.createTestServiceCollection({ configurationService });
  });

  it("adds a playbook", async () => {
    // Setup
    const playbookAddCommand = playbookAddCommandFactory();

    // Act
    await playbookAddCommand.setServiceCollection(serviceCollection).parseAsync(
      CliSimulator.createArgs([
        { name: "--playbook-name", value: "new" },
        { name: "--location", value: "https://www.example.com" },
      ]),
    );

    // Assert
    expect(configurationService.addPlaybook).toBeCalled();
  });
});
