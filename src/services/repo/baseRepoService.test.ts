import { RepoItem, RepoItemType } from "../../models";
import { ModelSimulator, ServiceSimulator, SimulatorRepoService } from "../../test";

describe("Base Repo Service", () => {
  const repo = "repo";
  const path = "path";
  const branch = "branch";
  const repoItemFile: RepoItem = {
    name: "item",
    path: "path",
    type: RepoItemType.File,
    content: "my content",
  };
  const repoItemDirectory: RepoItem = {
    name: "item",
    path: "path",
    type: RepoItemType.Directory,
    children: [
      {
        name: "child 1",
        path: "path/child 1",
        type: RepoItemType.File,
        content: "content 1",
      },
      {
        name: "child 2",
        path: "path/child 2",
        type: RepoItemType.File,
        content: "content 2",
      },
      {
        name: "child 3",
        path: "path/child 3",
        type: RepoItemType.File,
        content: "content 3",
      },
    ],
  };

  it("downlaods repo file to local directory", async () => {
    // Setup
    const getRepoItem = jest.fn(() => Promise.resolve(repoItemFile));
    const objectService = ServiceSimulator.createTestObjectService("");
    const service = new SimulatorRepoService(ModelSimulator.createTestRepoProviderOptions(), objectService);
    service.getRepoItem = getRepoItem;
    const outputPath = "outputPath";

    // Act
    await service.downloadRepoItem(repo, path, branch, outputPath);

    // Assert
    expect(getRepoItem).toBeCalledWith(repo, path, true, branch);
    expect(objectService.set).toBeCalled();
  });

  it("downloads repo directory to local directory", async () => {
    // Setup
    const getRepoItem = jest.fn(() => Promise.resolve(repoItemDirectory));
    const latestCommit = jest.fn();
    const objectService = ServiceSimulator.createTestObjectService("");
    const service = new SimulatorRepoService(ModelSimulator.createTestRepoProviderOptions(), objectService);
    service.getRepoItem = getRepoItem;
    service.latestCommit = latestCommit;
    const outputPath = "outputPath";

    // Act
    await service.downloadRepoItem(repo, path, branch, outputPath);

    // Assert
    expect(getRepoItem).toBeCalledWith(repo, path, true, branch);

    const { children } = repoItemDirectory;

    // For TypeScript's benefit
    if (children) {
      expect(children.length).toBe(3);
    } else {
      expect(children).toBeDefined();
    }
  });

  it("lists repo items for a repo directory", async () => {
    // Setup
    const getRepoItem = jest.fn(() => Promise.resolve(repoItemDirectory));
    const service = new SimulatorRepoService(ModelSimulator.createTestRepoProviderOptions(), undefined);
    service.getRepoItem = getRepoItem;

    // Act
    const result = await service.listRepoItems(repo, path, false, branch);

    // Assert
    expect(result).toEqual(repoItemDirectory.children);
    expect(getRepoItem).toBeCalledWith(repo, path, false, branch);
  });

  it("returns an empty array for when listing items for a repo file", async () => {
    // Setup
    const getRepoItem = jest.fn(() => Promise.resolve(repoItemFile));
    const service = new SimulatorRepoService(ModelSimulator.createTestRepoProviderOptions(), undefined);
    service.getRepoItem = getRepoItem;

    // Act
    const result = await service.listRepoItems(repo, path, false, branch);

    // Assert
    expect(result).toEqual([]);
    expect(getRepoItem).toBeCalledWith(repo, path, false, branch);
  });
});
