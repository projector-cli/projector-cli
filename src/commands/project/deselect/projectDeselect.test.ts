import { ServiceCollection } from "../../../models";
import { ConfigurationService } from "../../../services";
import { CliSimulator, ServiceSimulator } from "../../../test";
import { projectDeselectCommandFactory } from "./projectDeselect";

describe("Project Deselect Command", () => {
  let configurationService: ConfigurationService;
  let serviceCollection: ServiceCollection;

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
    serviceCollection = ServiceSimulator.createTestServiceCollection({ configurationService });
  });
  it("deselects a project", async () => {
    // Setup
    const projectDeselectCommand = projectDeselectCommandFactory();

    // Act
    await projectDeselectCommand
      .setServiceCollection(serviceCollection)
      .parseAsync(CliSimulator.createArgs([{ name: "--project", value: "active" }]));

    // Assert
    expect(configurationService.deselectProject).toBeCalled();
  });

  it("deselects all projects", async () => {
    // Setup
    const projectDeselectCommand = projectDeselectCommandFactory();

    // Act
    await projectDeselectCommand
      .setServiceCollection(serviceCollection)
      .parseAsync(CliSimulator.createArgs([{ name: "--all", value: "true" }]));

    // Assert
    expect(configurationService.deselectProject).toBeCalledTimes(2);
  });
});
