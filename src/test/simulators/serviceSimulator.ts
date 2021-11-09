import { Template, Logger, Parameters, ServiceCollection, Metrics, Configuration } from "../../models";
import {
  AgileService,
  ConfigurationService,
  InputService,
  PlaybookService,
  ProjectService,
  StorageService,
  StoredConfigurationService,
} from "../../services";
import { MockAgileServiceFunctions, SimulatorAgileService } from "./simulatorAgileService";

interface InputServiceMockAnswers {
  answer?: string;
  numberAnswer?: number;
  multiChoiceAnswer?: string;
  confirmAnswer?: boolean;
}

export class ServiceSimulator {
  public static createTestServiceCollection(existingServices: Partial<ServiceCollection> = {}): ServiceCollection {
    const {
      activePlaybookServiceFactoryMap: existingPlaybookServices,
      activeProjectServiceFactoryMap: existingProjectServices,
      templateService: existingTemplateService,
      parameterService: existingParameterService,
      configurationService: existingConfigurationService,
      logger: existingLogger,
      metrics: existingMetrics,
      inputService: existingInputService,
    } = existingServices;
    const inputService: InputService = existingInputService ?? ServiceSimulator.createTestInputService();
    const logger: Logger = existingLogger ?? ServiceSimulator.createTestLogger();
    const metrics: Metrics = existingMetrics ?? ServiceSimulator.createTestMetrics();
    const activePlaybookServiceFactoryMap: Map<string, () => PlaybookService> =
      existingPlaybookServices ?? this.createTestActivePlaybookServiceFactoryMap();
    const activeProjectServiceFactoryMap: Map<string, () => ProjectService> =
      existingProjectServices ?? this.createTestActiveProjectServiceFactoryMap();
    const configurationService =
      existingConfigurationService ??
      new StoredConfigurationService(ServiceSimulator.createTestStorageService<Configuration>(), logger);

    const serviceCollection: ServiceCollection = {
      parameterService: (existingParameterService ?? ServiceSimulator.createTestStorageService<Parameters>())!,
      templateService: (existingTemplateService ?? ServiceSimulator.createTestStorageService<Template>())!,
      configurationService,
      logger,
      metrics,
      inputService,
      activePlaybookServiceFactoryMap,
      activeProjectServiceFactoryMap,
    };

    return serviceCollection;
  }

  public static createTestActivePlaybookServiceFactoryMap(): Map<string, () => PlaybookService> {
    return new Map<string, () => PlaybookService>([["test", ServiceSimulator.createTestPlaybookService]]);
  }

  public static createTestActiveProjectServiceFactoryMap(): Map<string, () => ProjectService> {
    return new Map<string, () => ProjectService>([["test", ServiceSimulator.createTestProjectService]]);
  }

  public static createTestProjectService(): ProjectService {
    return {
      createSprints: jest.fn(),
      deployTemplates: jest.fn(),
    };
  }

  public static createTestStorageService<T>(
    readContent?: T,
    writeFunction?: jest.Mock,
    listFunction?: jest.Mock,
  ): StorageService<T> {
    return {
      read: jest.fn(() => Promise.resolve(readContent)),
      write: writeFunction || jest.fn(),
      list: listFunction || jest.fn(),
    };
  }

  public static createTestPlaybookService(): PlaybookService {
    return {
      getTemplates: jest.fn(() => Promise.resolve([])),
    };
  }

  public static createTestAgileService(functions: MockAgileServiceFunctions): AgileService {
    return new SimulatorAgileService(functions);
  }

  public static createTestLogger(): Logger {
    return {
      debug: jest.fn(),
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      logHeader: jest.fn(),
      addDefaultProperties: jest.fn(),
    };
  }

  public static createTestMetrics(): Metrics {
    return {
      set: jest.fn(),
      increment: jest.fn(),
      incrementBy: jest.fn(),
      flush: jest.fn(),
      addDefaultProperties: jest.fn(),
    };
  }

  public static createTestInputService(mockAnswers?: InputServiceMockAnswers): InputService {
    const confirmAnswer = mockAnswers ? mockAnswers.confirmAnswer : true;

    return {
      askNumberQuestion: jest.fn(() => Promise.resolve(mockAnswers?.numberAnswer || 0)),
      askQuestion: jest.fn(() => Promise.resolve(mockAnswers?.answer || "")),
      confirmAction: jest.fn(() => Promise.resolve(confirmAnswer ?? true)),
      multiChoiceQuestion: jest.fn(() => Promise.resolve(mockAnswers?.multiChoiceAnswer || "")),
    };
  }

  public static createTestConfigurationService(): ConfigurationService {
    return {
      getPlaybooks: jest.fn(),
      addPlaybook: jest.fn(),
      updatePlaybook: jest.fn(),
      removePlaybook: jest.fn(),
      selectPlaybook: jest.fn(),
      deselectPlaybook: jest.fn(),

      getProjects: jest.fn(),
      addProject: jest.fn(),
      updateProject: jest.fn(),
      removeProject: jest.fn(),
      selectProject: jest.fn(),
      deselectProject: jest.fn(),

      isAppInsightsEnabled: jest.fn(() => Promise.resolve(true)),
      setAppInsightsLogging: jest.fn(),
    };
  }
}
