import { Template } from "../../models";

export interface TemplateFilterOptions {
  branch?: string;
  name?: string;
  subdirectory?: string;
  all?: boolean;
}

export interface PlaybookService {
  getTemplates(options?: TemplateFilterOptions): Promise<Template[]>;
}
