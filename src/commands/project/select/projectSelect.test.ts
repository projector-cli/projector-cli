import { ServiceCollection } from "../../../models";
import { ConfigurationService } from "../../../services";
import { CliSimulator, ServiceSimulator } from "../../../test";
import { projectSelectCommandFactory } from "../select";

describe("Project Select Command", () => {
  let configurationService: ConfigurationService;
  let serviceCollection: ServiceCollection;

  beforeEach(() => {
    configurationService = ServiceSimulator.createTestConfigurationService();
    configurationService.getProjects = () => {
      return Promise.resolve([
        {
          projectName: "active",
          url: new URL("https://www.example.com"),
          isActive: true,
        },
        {
          projectName: "inactive",
          url: new URL("https://www.github.com/projector-cli/projector-cli"),
          isActive: false,
        },
      ]);
    };
    serviceCollection = ServiceSimulator.createTestServiceCollection({ configurationService });
  });

  it("selects a named project from the list of known projects", async () => {
    // Setup
    const projectSelectCommand = projectSelectCommandFactory();

    // Act
    await projectSelectCommand
      .setServiceCollection(serviceCollection)
      .parseAsync(CliSimulator.createArgs([{ name: "--project", value: "inactive" }]));

    // Assert
    expect(configurationService.selectProject).toBeCalled();
  });

  it("selects a project exclusively from the list of known playlists", async () => {
    // Setup
    const projectSelectCommand = projectSelectCommandFactory();
    const command = projectSelectCommand.setServiceCollection(serviceCollection);

    // Act
    await command.parseAsync(
      CliSimulator.createArgs([
        { name: "--project", value: "inactive" },
        { name: "--exclusive", value: "true" },
      ]),
    );

    // Assert
    expect(configurationService.selectProject).toBeCalled();
    expect(configurationService.deselectProject).toBeCalled();
  });
});
