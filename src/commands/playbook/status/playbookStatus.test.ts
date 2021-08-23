import { Logger, ServiceCollection } from "../../../models";
import { ConfigurationService } from "../../../services";
import { CliSimulator, ServiceSimulator } from "../../../test";
import { playbookStatusCommandFactory } from "../status";

describe("Playbook Status Command", () => {
  let configurationService: ConfigurationService;
  let serviceCollection: ServiceCollection;
  let logger: Logger;

  beforeEach(() => {
    configurationService = ServiceSimulator.createTestConfigurationService();
    configurationService.getPlaybooks = () => {
      return Promise.resolve([
        {
          playbookName: "active",
          location: "",
          isActive: true,
        },
        {
          playbookName: "inactive",
          location: "",
          isActive: false,
        },
      ]);
    };

    logger = ServiceSimulator.createTestLogger();
    serviceCollection = ServiceSimulator.createTestServiceCollection({ configurationService, logger });
  });

  it("logs the status of the playbooks", async () => {
    // Setup
    const playbookStatusCommand = playbookStatusCommandFactory();

    // Act
    await playbookStatusCommand.setServiceCollection(serviceCollection).parseAsync(CliSimulator.createArgs([]));

    // Assert
    expect(logger.log).toBeCalled();
  });
});
