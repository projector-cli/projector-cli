import { BacklogItem, Project, Sprint } from "../../models";
import { AgileService } from "../../services";

export interface MockAgileServiceFunctions {
  createProject?: (project: Project) => Promise<Project>;
  getProject?: (name: string) => Promise<Project | null>;
  deleteProject?: (project: Project) => Promise<boolean>;
  getSprint?: (id: string) => Promise<Sprint>;
  createSprints?: (sprints: Sprint[]) => Promise<Sprint[]>;
  deleteSprint?: (id: string) => Promise<void>;
  getBacklogItems?: (ids?: string[]) => Promise<BacklogItem[]>;
  createBacklogItems?: (items: BacklogItem[]) => Promise<BacklogItem[]>;
  deleteBacklogItems?: (ids: string[]) => Promise<void>;
}

export class SimulatorAgileService implements AgileService {
  createProject: (project: Project) => Promise<Project>;
  getProject: (name: string) => Promise<Project | null>;
  deleteProject: (project: Project) => Promise<boolean>;
  getSprint: (id: string) => Promise<Sprint>;
  createSprints: (sprints: Sprint[]) => Promise<Sprint[]>;
  deleteSprint: (id: string) => Promise<void>;
  getBacklogItems: (ids?: string[]) => Promise<BacklogItem[]>;
  createBacklogItems: (items: BacklogItem[]) => Promise<BacklogItem[]>;
  deleteBacklogItems: (ids: string[]) => Promise<void>;

  constructor(functions?: MockAgileServiceFunctions) {
    const {
      getBacklogItems,
      createBacklogItems,
      createSprints,
      deleteBacklogItems,
      getSprint,
      deleteSprint,
      createProject,
      getProject,
      deleteProject,
    } = functions ?? {};
    this.getBacklogItems = getBacklogItems || jest.fn();
    this.createBacklogItems = createBacklogItems || jest.fn();
    this.deleteBacklogItems = deleteBacklogItems || jest.fn();
    this.createSprints = createSprints || jest.fn();
    this.getSprint = getSprint || jest.fn();
    this.deleteSprint = deleteSprint || jest.fn();
    this.createProject = createProject || jest.fn();
    this.getProject = getProject || jest.fn();
    this.deleteProject = deleteProject || jest.fn();
  }
}
