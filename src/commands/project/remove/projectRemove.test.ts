import { ServiceCollection } from "../../../models";
import { ConfigurationService } from "../../../services";
import { CliSimulator, ServiceSimulator } from "../../../test";
import { projectRemoveCommandFactory } from "../remove";

describe("Project Remove Command", () => {
  let configurationService: ConfigurationService;
  let serviceCollection: ServiceCollection;

  beforeEach(() => {
    configurationService = ServiceSimulator.createTestConfigurationService();
    serviceCollection = ServiceSimulator.createTestServiceCollection({ configurationService });
  });

  it("removes a project", async () => {
    // Setup
    const projectRemoveCommand = projectRemoveCommandFactory();

    // Act
    await projectRemoveCommand
      .setServiceCollection(serviceCollection)
      .parseAsync(CliSimulator.createArgs([{ name: "--project", value: "existing" }]));

    // Assert
    expect(configurationService.removeProject).toBeCalled();
  });
});
