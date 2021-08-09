import { SprintConfiguration } from "./sprintConfiguration";

export interface ProjectConfiguration {
  isActive?: boolean;
  projectName: string;
  url: URL;
  token?: string;
  sprints?: SprintConfiguration[];
}
