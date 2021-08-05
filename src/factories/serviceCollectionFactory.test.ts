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
      templateService,
      getAgileService,
      getPlaybookService,
      parameterService,
    } = ServiceCollectionFactory.create();

    expect(templateService).toBeDefined();
    expect(getAgileService).toBeDefined();
    expect(getPlaybookService).toBeDefined();
    expect(parameterService).toBeDefined();

    PlaybookServiceFactory.get = jest.fn();
    AgileServiceFactory.get = jest.fn();
    RepoServiceFactory.get = jest.fn();

    getPlaybookService({});
    expect(PlaybookServiceFactory.get).toBeCalledWith({});

    const agileOptions = ModelSimulator.createTestAgileProviderOptions();
    getAgileService(agileOptions);
    expect(AgileServiceFactory.get).toBeCalledWith(agileOptions, expect.anything(), expect.anything());
  });
});
