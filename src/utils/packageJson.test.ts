import { PackageJson } from "./packageJson";

describe("Package Json", () => {
  it("gets the package version", () => {
    expect(PackageJson.getVersion()).toMatch(/[0-9]+\.[0-9]+\.[0-9]+/);
  });
});
