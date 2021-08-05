import { OnlyRequire, PlaybookConfiguration, ProjectConfiguration } from "../../models";

export interface ConfigurationService {
  getPlaybooks(): Promise<PlaybookConfiguration[]>;
  addPlaybook(options: PlaybookConfiguration): void;
  updatePlaybook(options: OnlyRequire<PlaybookConfiguration, "name">): void;
  removePlaybook(name: string): void;
  selectPlaybook(name: string): void;
  deselectPlaybook(name: string): void;

  getProjects(): Promise<ProjectConfiguration[]>;
  addProject(options: ProjectConfiguration): void;
  updateProject(options: OnlyRequire<ProjectConfiguration, "name">): void;
  removeProject(name: string): void;
  selectProject(name: string): void;
  deselectProject(name: string): void;
}
