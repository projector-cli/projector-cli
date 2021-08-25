import { Template } from "../agile";
import { AgileProviderOptions, PlaybookOptions } from "../options";
import { AgileService, ConfigurationService, InputService, PlaybookService, StorageService } from "../../services";
import { Logger } from "./logger";
import { Metrics } from "./metrics";
import { Parameters } from "./parameters";

export interface ServiceCollection {
  getAgileService: (options: AgileProviderOptions) => AgileService;
  getPlaybookService: (options: PlaybookOptions) => PlaybookService;
  templateService: StorageService<Template>;
  parameterService: StorageService<Parameters>;
  configurationService: ConfigurationService;
  inputService: InputService;
  logger: Logger;
  metrics?: Metrics;
}
