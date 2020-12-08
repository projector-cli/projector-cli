jest.mock("@octokit/rest");
import { Octokit } from "@octokit/rest";
import { ModelSimulator } from "../../test";
import { RegexExtractor } from "../../utils";
import { GitHubRestService } from "./gitHubRestService";

describe("GitHub Rest Service", () => {
  let service: GitHubRestService;

  const serviceProviderOptions = ModelSimulator.createTestServiceProviderOptions();
  const { repo, owner } = RegexExtractor.getGitHubInfo(serviceProviderOptions);
  const requestOptions = {
    owner,
    baseUrl: "https://api.github.com",
    repo,
  };

  beforeEach(() => {
    Octokit.prototype = {
      issues: {
        update: jest.fn(),
        getMilestone: jest.fn(),
        createLabel: jest.fn(),
      },
    };
    service = new GitHubRestService(serviceProviderOptions);
  });

  it("gets an existing GitHub label", async () => {
    const label = ModelSimulator.createGitHubLabel();
    Octokit.prototype.issues.getLabel = jest.fn(() => Promise.resolve({ data: label }));
    const labelName = "label";

    const actual = await service.getOrCreateGitHubLabel(labelName);
    expect(Octokit.prototype.issues.getLabel).toBeCalledWith({
      ...requestOptions,
      name: labelName,
    });
    expect(actual).toEqual(label);
  });

  it("creates a new GitHub label", async () => {
    const label = ModelSimulator.createGitHubLabel();
    Octokit.prototype.issues.getLabel = jest.fn(() => {
      const e = new Error();
      throw {
        ...e,
        status: 404,
      };
    });
    Octokit.prototype.issues.createLabel = jest.fn(() => Promise.resolve({ data: label }));

    const labelName = "label";
    const color = "blue";
    const description = "this is my label";

    const actual = await service.getOrCreateGitHubLabel(labelName, description, color);
    expect(Octokit.prototype.issues.getLabel).toBeCalledWith({
      ...requestOptions,
      name: labelName,
    });
    expect(Octokit.prototype.issues.createLabel).toBeCalledWith({
      ...requestOptions,
      name: labelName,
      color,
      description,
    });
    expect(actual).toEqual(label);
  });

  it("closes an issue", async () => {
    const issue = 1;

    await service.closeGitHubIssue(issue);
    expect(Octokit.prototype.issues.update).toBeCalledWith({
      ...requestOptions,
      issue_number: issue,
      state: "closed",
    });
  });

  it("gets a milestone", async () => {
    const milestone = 1;
    const expected = ModelSimulator.createGitHubMilestone();
    Octokit.prototype.issues.getMilestone = jest.fn(() => Promise.resolve({ data: expected }));

    const actual = await service.getMilestone(milestone);
    expect(Octokit.prototype.issues.getMilestone).toBeCalledWith({
      ...requestOptions,
      milestone_number: milestone,
    });
    expect(actual).toEqual(expected);
  });
});
