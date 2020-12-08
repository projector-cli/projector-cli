import { BacklogItemTemplate } from "..";
import { RepoItem } from "../repo";
import { RepoTemplate } from "../template";

export interface PlaybookService {
  getBacklogItemTemplates: () => Promise<BacklogItemTemplate[]>;
  getTemplates: () => Promise<RepoTemplate[]>;
  getRepoItem: (templateName: string, includeContent?: boolean) => Promise<RepoItem>;
  downloadTemplate: (localRelativePath: string, template: RepoTemplate) => Promise<void>;
}
