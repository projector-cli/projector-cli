import { ServiceCollection } from "../../../models";
import { ConfigurationService } from "../../../services";
import { CliSimulator, ServiceSimulator } from "../../../test";
import { playbookDeselectCommandFactory } from "./playbookDeselect";

describe("Playbook Deselect Command", () => {
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
