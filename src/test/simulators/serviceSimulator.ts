import {
  Template,
  Logger,
  Repo,
  RepoItem,
  RepoService,
  Parameters,
  ServiceCollection,
  Metrics,
  Configuration,
} from "../../models";
import {
  AgileService,
  ConfigurationService,
  InputService,
  PlaybookService,
  StorageService,
  StoredConfigurationService,
} from "../../services";
import { ModelSimulator } from "./modelSimulator";
import { MockAgileServiceFunctions, SimulatorAgileService } from "./simulatorAgileService";

interface InputServiceMockAnswers {
  answer?: string;
  numberAnswer?: number;
  multiChoiceAnswer?: string;
  confirmAnswer?: boolean;
}

interface OptionalServiceCollection {
  agileService?: AgileService;
  repoService?: RepoService;
  playbookService?: PlaybookService;
  templateService?: StorageService<Template>;
  parameterService?: StorageService<Parameters>;
  configurationService?: ConfigurationService;
  configService?: StorageService<string>;
  logger?: Logger;
  metrics?: Metrics;
  inputService?: InputService;
}

interface MockServiceCollection extends ServiceCollection {
  agileService: AgileService;
  repoService: RepoService;
  playbookService: PlaybookService;
}

export class ServiceSimulator {
  public static createTestServiceCollection(existingServices: OptionalServiceCollection = {}): MockServiceCollection {
    const {
      agileService: existingAgileService,
      repoService: existingRepoService,
      playbookService: existingPlaybookService,
      templateService: existingTemplateService,
      parameterService: existingParameterService,
      configurationService: existingConfigurationService,
      configService: existingConfigService,
      logger: existingLogger,
      metrics: existingMetrics,
      inputService: existingInputService,
    } = existingServices;
    const inputService: InputService = (existingInputService || ServiceSimulator.createTestInputService())!;
    const logger: Logger = (existingLogger || ServiceSimulator.createTestLogger())!;
    const metrics: Metrics = (existingMetrics || ServiceSimulator.createTestMetrics())!;
    const agileService: AgileService = (existingAgileService ||
      ServiceSimulator.createTestAgileService({}, inputService, logger))!;
    const repoService: RepoService = (existingRepoService || ServiceSimulator.createTestRepoService())!;
    const playbookService: PlaybookService = (existingPlaybookService || ServiceSimulator.createTestPlaybookService())!;
    const configurationService =
      existingConfigurationService ||
      new StoredConfigurationService(ServiceSimulator.createTestStorageService<Configuration>(), logger);

    const serviceCollection: ServiceCollection = {
      parameterService: (existingParameterService || ServiceSimulator.createTestStorageService<Parameters>())!,
      templateService: (existingTemplateService || ServiceSimulator.createTestStorageService<Template>())!,
      configurationService,
      configService: (existingConfigService || ServiceSimulator.createTestStorageService<string>())!,
      logger,
      metrics,
      inputService,
      getPlaybookService: () => playbookService,
      getAgileService: () => agileService,
    };

    return {
      ...serviceCollection,
      agileService,
      repoService,
      playbookService,
    };
  }

  public static createTestRepoService(repo?: Repo, repoItem?: RepoItem): RepoService {
    repo = repo ?? ModelSimulator.createTestRepo();
    repoItem = repoItem ?? ModelSimulator.createTestRepoItem();

    return {
      listRepos: jest.fn(() => Promise.resolve([repo!])),
      getRepo: jest.fn(() => Promise.resolve(repo!)),
      deleteRepo: jest.fn(),
      createRepo: jest.fn(() => Promise.resolve(repo!)),
      latestCommit: jest.fn(),
      listRepoItems: jest.fn(() => Promise.resolve([repoItem!])),
      getRepoItem: jest.fn(() => Promise.resolve(repoItem!)),
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

  public static createTestPlaybookService(templates?: Template[]): PlaybookService {
    return {
      getTemplates: jest.fn(() => Promise.resolve(templates || [])),
    };
  }

  public static createTestAgileService(
    functions: MockAgileServiceFunctions,
    inputService: InputService,
    logger: Logger,
  ): AgileService {
    return new SimulatorAgileService(functions, inputService, logger);
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
    };
  }
}
