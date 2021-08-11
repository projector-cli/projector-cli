import { ServiceCollection } from "../../../models";
import { ConfigurationService } from "../../../services";
import { CliSimulator, ServiceSimulator } from "../../../test";
import { playbookSelectCommandFactory } from "../select";

describe("Playbook Select Command", () => {
  let configurationService: ConfigurationService;
  let serviceCollection: ServiceCollection;

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
