import { Template } from "../agile";
import { AgileProviderOptions, PlaybookOptions } from "../options";
import { AgileService, InputService, PlaybookService, StorageService } from "../../services";
import { Logger } from "./logger";
import { Metrics } from "./metrics";
import { Parameters } from "./parameters";

export interface ServiceCollection {
  getAgileService: (options: AgileProviderOptions) => AgileService;
  getPlaybookService: (options: PlaybookOptions) => PlaybookService;
  templateService: StorageService<Template>;
  parameterService: StorageService<Parameters>;
  configService: StorageService<string>;
  inputService: InputService;
  logger: Logger;
  metrics?: Metrics;
}
