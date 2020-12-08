import { BacklogItem, Project, Sprint } from "../../../../models";
import { BaseAgileService } from "../../baseAgileService";

export class JiraAgileService extends BaseAgileService {
  createProject = async (): Promise<Project> => {
    throw new Error("Not implemented");
  };

  getProject = async (): Promise<Project | null> => {
    throw new Error("Not implemented");
  };

  deleteProject = async (): Promise<boolean> => {
    throw new Error("Not implemented");
  };

  getBacklogItems = async (): Promise<BacklogItem[]> => {
    throw new Error("Not implemented");
  };

  createBacklogItems = async (): Promise<BacklogItem[]> => {
    throw new Error("Not implemented");
  };

  deleteBacklogItems = async (): Promise<void> => {
    throw new Error("Not implemented");
  };

  createProviderSprints = async (): Promise<Sprint[]> => {
    throw new Error("Not implemented");
  };

  getSprint = async (): Promise<Sprint> => {
    throw new Error("Not implemented");
  };

  deleteSprint = async (): Promise<void> => {
    throw new Error("Not implemented");
  };
}
