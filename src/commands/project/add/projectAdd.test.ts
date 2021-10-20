import { ServiceCollection } from "../../../models";
import { ConfigurationService } from "../../../services";
import { CliSimulator, ServiceSimulator } from "../../../test";
import { projectAddCommandFactory } from "../add";

describe("Project Add Command", () => {
  let configurationService: ConfigurationService;
  let serviceCollection: ServiceCollection;

  beforeEach(() => {
    configurationService = ServiceSimulator.createTestConfigurationService();
    serviceCollection = ServiceSimulator.createTestServiceCollection({ configurationService });
  });

  it("adds a playbook", async () => {
    // Setup
    const projectAddCommand = projectAddCommandFactory();

    // Act
    await projectAddCommand.setServiceCollection(serviceCollection).parseAsync(
      CliSimulator.createArgs([
        { name: "--project-name", value: "new" },
        { name: "--url", value: "https://www.example.com" },
      ]),
    );

    // Assert
    expect(configurationService.addProject).toBeCalled();
  });
});
