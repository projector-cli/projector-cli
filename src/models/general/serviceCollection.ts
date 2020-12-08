import { ObjectService } from "../../services";
import { AgileService, BacklogItemTemplate } from "../agile";
import { AgileProviderOptions, PlaybookOptions, RepoProviderOptions } from "../options";
import { PlaybookService } from "../playbook";
import { RepoService } from "../repo";
import { InputService } from "./inputService";
import { Logger } from "./logger";
import { Metrics } from "./metrics";
import { Parameters } from "./parameters";

export interface ServiceCollection {
  getAgileService: (options: AgileProviderOptions) => AgileService;
  getRepoService: (options: RepoProviderOptions) => RepoService;
  getPlaybookService: (options: PlaybookOptions) => PlaybookService;
  backlogItemTemplateService: ObjectService<BacklogItemTemplate>;
  parameterService: ObjectService<Parameters>;
  contentService: ObjectService<string>;
  inputService: InputService;
  logger: Logger;
  metrics?: Metrics;
}
