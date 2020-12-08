import { ConfigKey } from "../../../../constants";
import { Project } from "../../../../models";
import { ServiceSimulator, CliSimulator } from "../../../../test";
import { Config } from "../../../../utils";
import { agileProjectCreateCommandFactory } from "./agileProjectCreate";

describe("Agile Project Create Command", () => {
  const projectName = "test-project";
  const projectDescription = "this is an automated test project";
  const project = {
    name: projectName,
    description: projectDescription,
    visibility: 1,
    capabilities: {
      processTemplate: {
        templateTypeId: Config.getValue(ConfigKey.AgileDefaultProjectTemplateId),
      },
      versioncontrol: {
        sourceControlType: Config.getValue(ConfigKey.AgileDefaultSourceControl),
      },
    },
  };

  it("creates project from cli inputs", async () => {
    // Setup
    const createProject = jest.fn((project: Project) => Promise.resolve(project));
    const logger = ServiceSimulator.createTestLogger();
    const inputService = ServiceSimulator.createTestInputService();
    const agileService = ServiceSimulator.createTestAgileService({ createProject }, inputService, logger);
    const serviceCollection = ServiceSimulator.createTestServiceCollection({
      agileService,
      inputService,
      logger,
    });
    const agileProjectCreate = agileProjectCreateCommandFactory();

    // Act
    await agileProjectCreate.setServiceCollection(serviceCollection).parseAsync(
      CliSimulator.createAgileArgs([
        {
          name: "--project-name",
          value: projectName,
        },
        {
          name: "--project-description",
          value: projectDescription,
        },
      ]),
    );

    // Assert
    expect(createProject).toBeCalledWith(project);
    // Log success and project name
    expect(logger.log).toBeCalledTimes(1);
  });
});
