import { ModelSimulator, ServiceSimulator } from "../../../../test";
import { JiraAgileService } from "./jiraAgileService";

describe("Jira Agile Service", () => {
  const service = new JiraAgileService(
    ModelSimulator.createTestAgileProviderOptions(),
    ServiceSimulator.createTestInputService(),
    ServiceSimulator.createTestLogger(),
  );

  describe("createProject", () => {
    it("is not implemented", async () => {
      await expect(service.createProject()).rejects.toThrow();
    });
  });

  describe("getProject", () => {
    it("is not implemented", async () => {
      await expect(service.getProject()).rejects.toThrow();
    });
  });

  describe("deleteProject", () => {
    it("is not implemented", async () => {
      await expect(service.deleteProject()).rejects.toThrow();
    });
  });

  describe("getBacklogItems", () => {
    it("is not implemented", async () => {
      await expect(service.getBacklogItems()).rejects.toThrow();
    });
  });

  describe("createBacklogItems", () => {
    it("is not implemented", async () => {
      await expect(service.createBacklogItems()).rejects.toThrow();
    });
  });

  describe("createProviderSprints", () => {
    it("is not implemented", async () => {
      await expect(service.createProviderSprints()).rejects.toThrow();
    });
  });

  describe("getSprint", () => {
    it("is not implemented", async () => {
      await expect(service.getSprint()).rejects.toThrow();
    });
  });

  describe("deleteSprint", () => {
    it("is not implemented", async () => {
      await expect(service.deleteSprint()).rejects.toThrow();
    });
  });
});
