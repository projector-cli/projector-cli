import { OnlyRequire, PlaybookConfiguration, ProjectConfiguration } from "../../models";

export interface ConfigurationService {
  getPlaybooks(): Promise<PlaybookConfiguration[]>;
  addPlaybook(options: PlaybookConfiguration): void;
  updatePlaybook(options: OnlyRequire<PlaybookConfiguration, "playbookName">): void;
  removePlaybook(playbookName: string): void;
  selectPlaybook(playbookName: string): void;
  deselectPlaybook(playbookName: string): void;

  getProjects(): Promise<ProjectConfiguration[]>;
  addProject(options: ProjectConfiguration): void;
  updateProject(options: OnlyRequire<ProjectConfiguration, "projectName">): void;
  removeProject(projectName: string): void;
  selectProject(projectName: string): void;
  deselectProject(projectName: string): void;

  isAppInsightsEnabled(): Promise<boolean>;
  setAppInsightsLogging(shouldLogToAppInsights: boolean): void;
}
