import { AgileProviderOptions, Template, Parameters, PlaybookOptions, ServiceCollection } from "../models";
import { FileStorageService, InquirerInputService, LoggerProvider, MetricsProvider } from "../services";
import { AgileServiceFactory } from "./agileServiceFactory";
import { LoggerFactory } from "./loggerFactory";
import { MetricsFactory } from "./metricsFactory";
import { PlaybookServiceFactory } from "./playbookServiceFactory";

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
    const parameterService = new FileStorageService<Parameters>(process.cwd(), logger);
    const templateService = new FileStorageService<Template>(process.cwd(), logger);
    const configService = new FileStorageService<string>(process.cwd(), logger);
    const inputService = new InquirerInputService(logger);

    return {
      getAgileService: (options: AgileProviderOptions) => AgileServiceFactory.get(options, inputService, logger),
      getPlaybookService: (options: PlaybookOptions) => PlaybookServiceFactory.get(options),
      templateService,
      parameterService,
      configService,
      logger,
      inputService,
      metrics: MetricsFactory.getIfRegistered(MetricsProvider.AppInsights),
    };
  }
}
