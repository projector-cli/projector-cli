import { CliSimulator, ServiceSimulator } from "../../../test";
import { RepoServiceFactory } from "../../../factories";
import { Repo } from "../../../models";
import { RepoServiceProvider } from "../../../services";
import { repoCreateCommandFactory } from "./repoCreate";

describe("Repo Create", () => {
  beforeAll(() => {
    RepoServiceFactory.register(RepoServiceProvider.Simulator, jest.fn());
  });

  it("creates repos provided by a CLI option", async () => {
    const repoService = ServiceSimulator.createTestRepoService();

    const repo: Repo = { name: "test", id: "test", remoteUrl: "test" };
    repoService.createRepo = jest.fn(() => Promise.resolve(repo));

    const serviceCollection = ServiceSimulator.createTestServiceCollection({
      repoService,
    });

    const newRepoName = "myNewRepo";

    const repoCreate = repoCreateCommandFactory();

    await repoCreate
      .setServiceCollection(serviceCollection)
      .parseAsync(CliSimulator.createRepoArgs(undefined, newRepoName));

    expect(repoService.createRepo).toBeCalledWith(newRepoName);
  });
});
