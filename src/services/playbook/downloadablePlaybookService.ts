import { Downloadable, PlaybookConfiguration, Template } from "../../models";
import { PlaybookService, TemplateFilterOptions } from "./playbookService";

export class DownloadablePlaybookService implements PlaybookService {
  constructor(
    private readonly findTemplates: (
      configuration: PlaybookConfiguration,
      options?: TemplateFilterOptions,
    ) => Promise<Downloadable[]>,
    private readonly getTemplate: (downloadable: Downloadable) => Promise<Template>,
    private readonly playbookConfiguration: PlaybookConfiguration,
  ) {}

  public async getTemplates(options?: TemplateFilterOptions): Promise<Template[]> {
    const templateLocations = await this.findTemplates(this.playbookConfiguration, options);

    const templates = await Promise.all(
      templateLocations.map(async (downloadable) => {
        return this.getTemplate(downloadable);
      }),
    );

    return templates.filter((template): template is Template => !!template);
  }
}
