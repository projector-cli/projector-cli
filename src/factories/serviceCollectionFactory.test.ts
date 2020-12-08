import { ObjectService } from "../services";
import { PlaybookServiceFactory } from "./playbookServiceFactory";
import { ServiceCollectionFactory } from "./serviceCollectionFactory";
import { registerProviders } from "../initialization";
import { AgileServiceFactory } from "./agileServiceFactory";
import { RepoServiceFactory } from "./repoServiceFactory";
import { ModelSimulator } from "../test";

describe("Service Collection Factory", () => {
  beforeAll(() => {
    registerProviders();
  });

  it("creates a service collection", () => {
    const {
      backlogItemTemplateService,
      contentService,
      getAgileService,
      getPlaybookService,
      getRepoService,
      parameterService,
    } = ServiceCollectionFactory.create();

    expect(backlogItemTemplateService).toBeDefined();
    expect(contentService).toBeDefined();
    expect(getAgileService).toBeDefined();
    expect(getPlaybookService).toBeDefined();
    expect(getRepoService).toBeDefined();
    expect(parameterService).toBeDefined();

    PlaybookServiceFactory.get = jest.fn();
    AgileServiceFactory.get = jest.fn();
    RepoServiceFactory.get = jest.fn();

    getPlaybookService({});
    expect(PlaybookServiceFactory.get).toBeCalledWith({}, expect.any(ObjectService), expect.anything());

    const agileOptions = ModelSimulator.createTestAgileProviderOptions();
    getAgileService(agileOptions);
    expect(AgileServiceFactory.get).toBeCalledWith(agileOptions, expect.anything(), expect.anything());

    const repoOptions = ModelSimulator.createTestRepoProviderOptions();
    getRepoService(repoOptions);
    expect(RepoServiceFactory.get).toBeCalledWith(repoOptions, expect.any(ObjectService));
  });
});
