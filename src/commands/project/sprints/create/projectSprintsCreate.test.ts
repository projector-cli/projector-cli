import { ServiceSimulator, CliSimulator } from "../../../../test";
import { projectSprintsCreateCommandFactory } from "./projectSprintsCreate";

describe("Project Sprints Create Command", () => {
  it("creates sprints", async () => {
    const inputService = ServiceSimulator.createTestInputService({
      confirmAnswer: true,
      answer: "4/23/2021",
      numberAnswer: 5,
    });
    inputService.confirmAction = jest.fn(() => Promise.resolve(true));

    const projectService = ServiceSimulator.createTestProjectService();
    const activeProjectServiceFactoryMap = ServiceSimulator.createTestActiveProjectServiceFactoryMap();
    activeProjectServiceFactoryMap.set("test", () => projectService);

    const serviceCollection = ServiceSimulator.createTestServiceCollection({
      activeProjectServiceFactoryMap,
      inputService,
    });

    const projectSprintsCreate = projectSprintsCreateCommandFactory();

    await projectSprintsCreate.setServiceCollection(serviceCollection).parseAsync(CliSimulator.createArgs());
    expect(projectService.createSprints).toBeCalled();
  });
});
