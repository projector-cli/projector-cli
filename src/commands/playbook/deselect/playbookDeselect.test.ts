import { Configuration, Logger, ServiceCollection } from "../../../models";
import { ConfigurationService, StorageService, StoredConfigurationService } from "../../../services";
import { CliSimulator, ServiceSimulator } from "../../../test";
import { playbookDeselectCommandFactory } from "./playbookDeselect";

describe("Playbook Deselect Command", () => {
  let configuration: Configuration;
  let storageService: StorageService<Configuration>;
  let logger: Logger;
  let configurationService: ConfigurationService;
  let serviceCollection: ServiceCollection;

  beforeEach(() => {
    configuration = {
      playbooks: [
        {
          name: "active",
          location: "",
          isActive: true,
        },
        {
          name: "inactive",
          location: "",
          isActive: false,
        },
      ],
      projects: [],
      appInsights: {
        instrumentationKey: "",
        enabled: true,
      },
    };

    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    logger = ServiceSimulator.createTestLogger();
    configurationService = new StoredConfigurationService(storageService, logger);
    configurationService.deselectPlaybook = jest.fn();
    serviceCollection = ServiceSimulator.createTestServiceCollection({ configurationService });
  });
  it("deselects a playbook", async () => {
    // Setup
    const playbookDeselectCommand = playbookDeselectCommandFactory();

    // Act
    await playbookDeselectCommand
      .setServiceCollection(serviceCollection)
      .parseAsync(CliSimulator.createArgs([{ name: "--playbook", value: "active" }]));

    // Assert
    expect(configurationService.deselectPlaybook).toBeCalled();
  });

  it("deselects all playbooks", async () => {
    // Setup
    const playbookDeselectCommand = playbookDeselectCommandFactory();

    // Act
    await playbookDeselectCommand
      .setServiceCollection(serviceCollection)
      .parseAsync(CliSimulator.createArgs([{ name: "--all", value: "true" }]));

    // Assert
    expect(configurationService.deselectPlaybook).toBeCalledTimes(2);
  });
});
