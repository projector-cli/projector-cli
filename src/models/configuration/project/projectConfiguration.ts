import { SprintConfiguration } from "./sprintConfiguration";

export interface ProjectConfiguration {
  isActive?: boolean;
  name: string;
  url: URL;
  token?: string;
  sprints?: SprintConfiguration[];
}
