import {
  AgileProviderOptions,
  BacklogItemTemplate,
  Parameters,
  PlaybookOptions,
  RepoProviderOptions,
  ServiceCollection,
} from "../models";
import { FileStorageService, LoggerProvider, MetricsProvider, ObjectService } from "../services";
import { InquirerInputService } from "../services/input/inquirerInputService";
import { AgileServiceFactory } from "./agileServiceFactory";
import { LoggerFactory } from "./loggerFactory";
import { MetricsFactory } from "./metricsFactory";
import { PlaybookServiceFactory } from "./playbookServiceFactory";
import { RepoServiceFactory } from "./repoServiceFactory";

/**
 * Factory for collections of services
 */
export class ServiceCollectionFactory {
  /**
   * Create collection of shared services
   *
   * @returns {ServiceCollection} Service Collection
   */
  public static create(): ServiceCollection {
    const logger = LoggerFactory.get(LoggerProvider.Composite);
    const localFileStorageService = new FileStorageService(process.cwd(), logger);
    const parameterService = new ObjectService<Parameters>(localFileStorageService);
    const backlogItemTemplateService = new ObjectService<BacklogItemTemplate>(localFileStorageService);
    const contentService = new ObjectService<string>(localFileStorageService);
    const inputService = new InquirerInputService(logger);

    return {
      getAgileService: (options: AgileProviderOptions) => AgileServiceFactory.get(options, inputService, logger),
      getRepoService: (options: RepoProviderOptions) => RepoServiceFactory.get(options, contentService),
      getPlaybookService: (options: PlaybookOptions) =>
        PlaybookServiceFactory.get(options, contentService, localFileStorageService),
      backlogItemTemplateService,
      parameterService,
      contentService,
      logger,
      inputService,
      metrics: MetricsFactory.getIfRegistered(MetricsProvider.AppInsights),
    };
  }
}
