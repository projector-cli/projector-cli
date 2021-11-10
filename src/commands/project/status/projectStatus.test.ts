import { Logger, ServiceCollection } from "../../../models";
import { ConfigurationService } from "../../../services";
import { CliSimulator, ServiceSimulator } from "../../../test";
import { projectStatusCommandFactory } from "../status";

describe("Project Status Command", () => {
  let configurationService: ConfigurationService;
  let serviceCollection: ServiceCollection;
  let logger: Logger;

  beforeEach(() => {
    configurationService = ServiceSimulator.createTestConfigurationService();
    configurationService.getProjects = () => {
      return Promise.resolve([
        {
          projectName: "active",
          url: "https://www.example.com",
          isActive: true,
        },
        {
          projectName: "inactive",
          url: "https://www.github.com/projector-cli/projector-cli",
          isActive: false,
        },
      ]);
    };

    logger = ServiceSimulator.createTestLogger();
    serviceCollection = ServiceSimulator.createTestServiceCollection({ configurationService, logger });
  });

  it("logs the status of the projects", async () => {
    // Setup
    const projectStatusCommand = projectStatusCommandFactory();

    // Act
    await projectStatusCommand.setServiceCollection(serviceCollection).parseAsync(CliSimulator.createArgs([]));

    // Assert
    expect(logger.log).toBeCalled();
  });
});
