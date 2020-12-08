import { RegexExtractor } from "./regexExtractor";

describe("Regex Extractor", () => {
  it("extracts GitHub info with no slash at end of base url", () => {
    const { baseUrl, owner, repo } = RegexExtractor.getGitHubInfo({
      accessToken: "token",
      baseUrl: "https://github.com/projector-cli",
      projectName: "projector-cli",
    });
    expect(baseUrl).toEqual("https://github.com");
    expect(owner).toEqual("projector-cli");
    expect(repo).toEqual("projector-cli");
  });

  it("extracts GitHub info with slash at end of base url", () => {
    const { baseUrl, owner, repo } = RegexExtractor.getGitHubInfo({
      accessToken: "token",
      baseUrl: "https://github.com/projector-cli/",
      projectName: "projector-cli",
    });
    expect(baseUrl).toEqual("https://github.com");
    expect(owner).toEqual("projector-cli");
    expect(repo).toEqual("projector-cli");
  });
});
