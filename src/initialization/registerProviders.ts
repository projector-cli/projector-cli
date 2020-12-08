import { TelemetryClient } from "applicationinsights";
import { ConfigKey } from "../constants";
import { AgileServiceFactory, LoggerFactory, MetricsFactory, RepoServiceFactory } from "../factories";
import { Logger, Properties } from "../models";
import {
  AgileServiceProvider,
  ApplicationInsightsMetrics,
  AzureDevOpsAgileService,
  AzureDevOpsRepoService,
  CompositeLogger,
  ConsoleLogger,
  GitHubAgileService,
  GitHubRepoService,
  JiraAgileService,
  LoggerProvider,
  MetricsProvider,
  RepoServiceProvider,
} from "../services";
import { ApplicationInsightsLogger } from "../services/logger/applicationInsightsLogger";
import { Config, PackageJson } from "../utils";

/**
 * Register all service providers
 */
export function registerProviders(): void {
  const defaultAppInsightsProperties: Properties = {
    version: PackageJson.getVersion(),
  };

  registerAgileServiceProviders();
  registerRepoServiceProviders();

  // Initialize here so metrics and logging can share same client
  const telemetryClient = Config.isAppInsightsEnabled()
    ? new TelemetryClient(Config.getValue(ConfigKey.AppInsightsInstrumentationKey))
    : undefined;

  registerLoggerServiceProviders(defaultAppInsightsProperties, telemetryClient);
  registerMetricsServiceProviders(defaultAppInsightsProperties, telemetryClient);
}

/**
 * Register all Agile Service Providers
 */
function registerAgileServiceProviders() {
  AgileServiceFactory.register(AgileServiceProvider.AzureDevOps, AzureDevOpsAgileService);
  AgileServiceFactory.register(AgileServiceProvider.Jira, JiraAgileService);
  AgileServiceFactory.register(AgileServiceProvider.GitHub, GitHubAgileService);
}

/**
 * Register all Repo Service Providers
 */
function registerRepoServiceProviders(): void {
  RepoServiceFactory.register(RepoServiceProvider.GitHub, GitHubRepoService);
  RepoServiceFactory.register(RepoServiceProvider.AzureDevOps, AzureDevOpsRepoService);
}

/**
 * Register all available loggers
 *
 * @param {Properties} defaultAppInsightsProperties Default properties for app insights clients
 * @param {TelemetryClient|undefined} telemetryClient App insights telemetry client
 */
function registerLoggerServiceProviders(
  defaultAppInsightsProperties: Properties,
  telemetryClient?: TelemetryClient,
): void {
  const consoleLogger = new ConsoleLogger();
  LoggerFactory.register(LoggerProvider.Console, consoleLogger);

  const compositeLoggers: Logger[] = [consoleLogger];

  if (telemetryClient) {
    const appInsightsLogger = new ApplicationInsightsLogger(telemetryClient, defaultAppInsightsProperties);
    LoggerFactory.register(LoggerProvider.AppInsights, appInsightsLogger);
    compositeLoggers.push(appInsightsLogger);
  }

  LoggerFactory.register(LoggerProvider.Composite, new CompositeLogger(compositeLoggers));
}

/**
 * Register all available metrics providers
 *
 * @param {Properties} defaultAppInsightsProperties Default properties for app insights clients
 * @param {TelemetryClient|undefined} telemetryClient App insight telemetry client
 */
function registerMetricsServiceProviders(
  defaultAppInsightsProperties: Properties,
  telemetryClient?: TelemetryClient,
): void {
  if (telemetryClient) {
    const appInsightsMetrics = new ApplicationInsightsMetrics(telemetryClient, defaultAppInsightsProperties);
    MetricsFactory.register(MetricsProvider.AppInsights, appInsightsMetrics);
  }
}
