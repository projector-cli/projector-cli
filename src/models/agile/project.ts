import { ProjectVisibility } from "azure-devops-node-api/interfaces/CoreInterfaces";

export interface Project {
  id?: string;
  name: string;
  description: string;
  visibility: ProjectVisibility;
  capabilities: {
    versioncontrol: {
      sourceControlType: string;
    };
    processTemplate?: {
      templateTypeId: string;
    };
  };
  // other properties could be:
  // _links: null,
  //  defaultTeam: null,
  //  abbreviation: null,
  //  id: null,
  //  revision: null,
  //  state: null,
  //  url: null
  //  hard-coded values above can also be configured in future iterations
}
