import { PlaybookConfiguration } from "./playbook";
import { ProjectConfiguration } from "./project";

export interface Configuration {
  playbooks?: PlaybookConfiguration[];
  projects?: ProjectConfiguration[];
  appInsights?: {
    instrumentationKey?: string;
    enabled?: boolean;
  };
}
