import { Configuration, Logger, ServiceCollection } from "../../../models";
import { ConfigurationService, StorageService, StoredConfigurationService } from "../../../services";
import { CliSimulator, ServiceSimulator } from "../../../test";
import { playbookSelectCommandFactory } from "../select";

describe("Playbook Select Command", () => {
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
    configurationService.selectPlaybook = jest.fn();
    configurationService.deselectPlaybook = jest.fn();
    serviceCollection = ServiceSimulator.createTestServiceCollection({ configurationService });
  });

  it("selects a named playbook from the list of known playbooks", async () => {
    // Setup
    const playbookSelectCommand = playbookSelectCommandFactory();

    // Act
    await playbookSelectCommand
      .setServiceCollection(serviceCollection)
      .parseAsync(CliSimulator.createArgs([{ name: "--playbook", value: "inactive" }]));

    // Assert
    expect(configurationService.selectPlaybook).toBeCalled();
  });

  it("selects a playbook exclusively from the list of known playlists", async () => {
    // Setup
    const playbookSelectCommand = playbookSelectCommandFactory();
    const command = playbookSelectCommand.setServiceCollection(serviceCollection);

    // Act
    await command.parseAsync(
      CliSimulator.createArgs([
        { name: "--playbook", value: "inactive" },
        { name: "--exclusive", value: "true" },
      ]),
    );

    // Assert
    expect(configurationService.selectPlaybook).toBeCalled();
    expect(configurationService.deselectPlaybook).toBeCalled();
  });
});
