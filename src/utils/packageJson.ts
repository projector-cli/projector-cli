// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require("../../package.json");

export class PackageJson {
  public static getVersion(): string {
    return packageJson.version;
  }
}
