import { Template } from "../agile";
import { ConfigurationService, InputService, PlaybookService, ProjectService, StorageService } from "../../services";
import { Logger } from "./logger";
import { Metrics } from "./metrics";
import { Parameters } from "./parameters";

export interface ServiceCollection {
  activePlaybookServiceFactoryMap: Map<string, () => PlaybookService>;
  activeProjectServiceFactoryMap: Map<string, () => ProjectService>;
  configurationService: ConfigurationService;
  inputService: InputService;
  logger: Logger;
  metrics?: Metrics;
  parameterService: StorageService<Parameters>;
  templateService: StorageService<Template>;
}
