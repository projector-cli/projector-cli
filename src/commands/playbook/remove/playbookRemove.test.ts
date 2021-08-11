import { ServiceCollection } from "../../../models";
import { ConfigurationService } from "../../../services";
import { CliSimulator, ServiceSimulator } from "../../../test";
import { playbookRemoveCommandFactory } from "../remove";

describe("Playbook Remove Command", () => {
  let configurationService: ConfigurationService;
  let serviceCollection: ServiceCollection;

  beforeEach(() => {
    configurationService = ServiceSimulator.createTestConfigurationService();
    serviceCollection = ServiceSimulator.createTestServiceCollection({ configurationService });
  });

  it("removes a playbook", async () => {
    // Setup
    const playbookRemoveCommand = playbookRemoveCommandFactory();

    // Act
    await playbookRemoveCommand
      .setServiceCollection(serviceCollection)
      .parseAsync(CliSimulator.createArgs([{ name: "--playbook", value: "existing" }]));

    // Assert
    expect(configurationService.removePlaybook).toBeCalled();
  });
});
