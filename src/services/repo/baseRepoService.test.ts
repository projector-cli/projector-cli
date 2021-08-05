import { RepoItem, RepoItemType } from "../../models";
import { ModelSimulator, SimulatorRepoService } from "../../test";

describe("Base Repo Service", () => {
  const repo = "repo";
  const path = "path";
  const branch = "branch";
  const repoItemFile: RepoItem = {
    name: "item",
    path: "path",
    type: RepoItemType.File,
    content: ModelSimulator.createTestTemplate(),
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
        content: ModelSimulator.createTestTemplate(),
      },
      {
        name: "child 2",
        path: "path/child 2",
        type: RepoItemType.File,
        content: ModelSimulator.createTestTemplate(),
      },
      {
        name: "child 3",
        path: "path/child 3",
        type: RepoItemType.File,
        content: ModelSimulator.createTestTemplate(),
      },
    ],
  };

  it("lists repo items for a repo directory", async () => {
    // Setup
    const getRepoItem = jest.fn(() => Promise.resolve(repoItemDirectory));
    const service = new SimulatorRepoService(ModelSimulator.createTestRepoProviderOptions());
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
    const service = new SimulatorRepoService(ModelSimulator.createTestRepoProviderOptions());
    service.getRepoItem = getRepoItem;

    // Act
    const result = await service.listRepoItems(repo, path, false, branch);

    // Assert
    expect(result).toEqual([]);
    expect(getRepoItem).toBeCalledWith(repo, path, false, branch);
  });
});
