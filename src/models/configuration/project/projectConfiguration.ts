import { SprintConfiguration } from "./sprintConfiguration";

export interface ProjectConfiguration {
  isActive?: boolean;
  projectName: string;
  url: string;
  token?: string;
  sprints?: SprintConfiguration[];
}
