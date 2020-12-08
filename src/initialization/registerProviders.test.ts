import { AgileServiceFactory, LoggerFactory, MetricsFactory, RepoServiceFactory } from "../factories";
import { AgileProviderOptions, RepoProviderOptions } from "../models";
import {
  AgileServiceProvider,
  BaseAgileService,
  BaseRepoService,
  LoggerProvider,
  MetricsProvider,
  RepoServiceProvider,
} from "../services";
import { ModelSimulator, ServiceSimulator } from "../test";
import { registerProviders } from "./registerProviders";
jest.mock("azure-devops-node-api/WorkItemTrackingApi");

describe("Register Providers", () => {
  beforeAll(() => {
    registerProviders();
  });

  it("registers all agile providers", () => {
    // Setup
    const baseProviderOptions = ModelSimulator.createTestServiceProviderOptions();

    const providerOptions: AgileProviderOptions[] = [
      {
        ...baseProviderOptions,
        agileProvider: AgileServiceProvider.AzureDevOps,
      },
      {
        ...baseProviderOptions,
        agileProvider: AgileServiceProvider.GitHub,
      },
    ];

    providerOptions.forEach((options: AgileProviderOptions) => {
      // Act
      const agileService = AgileServiceFactory.get(
        options,
        ServiceSimulator.createTestInputService(),
        ServiceSimulator.createTestLogger(),
      );

      // Assert
      expect(agileService).toBeDefined();
      expect(agileService).toBeInstanceOf(BaseAgileService);
    });
  });

  it("registers all repo service providers", () => {
    // Setup
    const baseProviderOptions = ModelSimulator.createTestServiceProviderOptions();

    const providerOptions: RepoProviderOptions[] = [
      {
        ...baseProviderOptions,
        repoProvider: RepoServiceProvider.AzureDevOps,
      },
      {
        ...baseProviderOptions,
        repoProvider: RepoServiceProvider.GitHub,
      },
    ];

    providerOptions.forEach((options: RepoProviderOptions) => {
      // Act
      const repoService = RepoServiceFactory.get(options, ServiceSimulator.createTestObjectService<string>());

      // Assert
      expect(repoService).toBeDefined();
      expect(repoService).toBeInstanceOf(BaseRepoService);
    });
  });

  it("registers all logger service providers", () => {
    expect(LoggerFactory.get(LoggerProvider.Console)).toBeDefined();
    expect(LoggerFactory.get(LoggerProvider.AppInsights)).toBeDefined();
    expect(LoggerFactory.get(LoggerProvider.Composite)).toBeDefined();
  });

  it("registers all metrics providers", () => {
    expect(MetricsFactory.get(MetricsProvider.AppInsights)).toBeDefined();
  });
});
