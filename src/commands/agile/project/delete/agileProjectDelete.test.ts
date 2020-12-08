import { ServiceSimulator, ModelSimulator, CliSimulator } from "../../../../test";
import { agileProjectDeleteCommandFactory } from "./agileProjectDelete";

describe("Agile Project Delete", () => {
  describe("existing project", () => {
    it("deletes a project if exists and confirmed", async () => {
      const inputService = ServiceSimulator.createTestInputService({
        confirmAnswer: true,
      });
      const serviceCollection = ServiceSimulator.createTestServiceCollection({
        inputService,
      });
      const { agileService } = serviceCollection;
      const project = ModelSimulator.createTestProject();
      agileService.getProject = jest.fn(() => Promise.resolve(project));
      const agileProjectDelete = agileProjectDeleteCommandFactory();

      await agileProjectDelete.setServiceCollection(serviceCollection).parseAsync(CliSimulator.createAgileArgs());

      expect(agileService.deleteProject).toBeCalledWith(project);
    });

    it("does not delete if action not confirmed", async () => {
      const inputService = ServiceSimulator.createTestInputService({
        confirmAnswer: false,
      });
      const serviceCollection = ServiceSimulator.createTestServiceCollection({
        inputService,
      });
      const { agileService } = serviceCollection;
      const project = ModelSimulator.createTestProject();
      agileService.getProject = jest.fn(() => Promise.resolve(project));
      const agileProjectDelete = agileProjectDeleteCommandFactory();

      await agileProjectDelete.setServiceCollection(serviceCollection).parseAsync(CliSimulator.createAgileArgs());

      expect(agileService.deleteProject).not.toBeCalled();
    });

    it("throws error if project does not exist", async () => {
      const inputService = ServiceSimulator.createTestInputService({
        confirmAnswer: true,
      });
      const serviceCollection = ServiceSimulator.createTestServiceCollection({
        inputService,
      });
      const { agileService } = serviceCollection;
      agileService.getProject = jest.fn(() => Promise.resolve(null));
      const agileProjectDelete = agileProjectDeleteCommandFactory();

      await expect(
        agileProjectDelete.setServiceCollection(serviceCollection).parseAsync(CliSimulator.createAgileArgs()),
      ).rejects.toThrow();

      expect(agileService.deleteProject).not.toBeCalled();
    });
  });
});
