import {
  AgileService,
  BacklogItemTemplate,
  InputService,
  Logger,
  PlaybookService,
  Repo,
  RepoItem,
  RepoService,
  RepoTemplate,
  StorageService,
  Parameters,
  ServiceCollection,
  Metrics,
} from "../../models";
import { ObjectService } from "../../services";
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
  backlogItemTemplateService?: ObjectService<BacklogItemTemplate>;
  parameterService?: ObjectService<Parameters>;
  contentService?: ObjectService<string>;
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
      backlogItemTemplateService: existingBacklogItemTemplateService,
      parameterService: existingParameterService,
      contentService: existingContentService,
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

    const serviceCollection: ServiceCollection = {
      parameterService: (existingParameterService || ServiceSimulator.createTestObjectService<Parameters>())!,
      backlogItemTemplateService: (existingBacklogItemTemplateService ||
        ServiceSimulator.createTestObjectService<BacklogItemTemplate>())!,
      contentService: (existingContentService || ServiceSimulator.createTestObjectService<string>())!,
      logger,
      metrics,
      inputService,
      getPlaybookService: () => playbookService,
      getRepoService: () => repoService,
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
      downloadRepoItem: jest.fn(),
    };
  }

  public static createTestStorageService(readContent?: string, writeFunction?: jest.Mock): StorageService {
    return {
      find: jest.fn(),
      read: jest.fn(() => Promise.resolve(readContent)),
      write: writeFunction || jest.fn(),
      list: jest.fn(),
    };
  }

  public static createTestObjectService<T>(itemToGet?: T, listOfItems?: string[]): ObjectService<T> {
    const objectService = new ObjectService<T>(this.createTestStorageService());
    objectService.get = itemToGet ? jest.fn(async () => itemToGet) : jest.fn();
    objectService.list = listOfItems ? jest.fn(() => Promise.resolve(listOfItems || [])) : jest.fn();

    objectService.getIfExists = jest.fn();
    objectService.parse = jest.fn();
    objectService.set = jest.fn();

    return objectService;
  }

  public static createTestPlaybookService(
    templates?: RepoTemplate[],
    backlogItemTemplates?: BacklogItemTemplate[],
  ): PlaybookService {
    return {
      downloadTemplate: jest.fn(),
      getBacklogItemTemplates: jest.fn(() => Promise.resolve(backlogItemTemplates || [])),
      getRepoItem: jest.fn(),
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
}
