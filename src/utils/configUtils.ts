import { Link } from "../models/general/link";
import { ConfigKey } from "../constants";
import config from "config";
import customEnvironmentVariables from "../config/custom-environment-variables.json";

type ConfigMap = { [id: string]: string | ConfigMap };

export class Config {
  public static getValue<T = string>(configKey: ConfigKey): T {
    return config.get(configKey);
  }

  public static getValueWithDefault<T = string>(configKey: ConfigKey, defaultValue?: T): T | undefined {
    return config.has(configKey) ? config.get(configKey) : defaultValue;
  }

  public static getLink(name: string): Link {
    const links = this.getValue<Link[]>(ConfigKey.Links);
    const matchingLink = links.find((link) => link.name === name);
    if (!matchingLink) {
      throw new Error(`Missing link ${name} in config`);
    }
    return matchingLink;
  }

  public static getEnvironmentVariableName(configKey: ConfigKey): string {
    const splitConfigKey = configKey.split(".");

    let configObject: string | ConfigMap = customEnvironmentVariables;

    for (let i = 0; i < splitConfigKey.length; i++) {
      if (!configObject || typeof configObject === "string") {
        throw new Error(`Environment variable for config key '${configKey}' not defined`);
      }

      configObject = configObject[splitConfigKey[i]];
    }

    if (typeof configObject === "string") {
      return configObject;
    }

    throw new Error(`Environment variable for config key '${configKey}' not defined`);
  }

  public static getUpdatedEnvFileContents(configKey: ConfigKey, value: string, existingEnvFile?: string): string {
    const envVarName = Config.getEnvironmentVariableName(configKey);

    const updatedEnvVarLine = `${envVarName}=${value}`;

    const appendOrUpdate = (envFileContents: string): string => {
      return envFileContents.includes(envVarName)
        ? envFileContents.replace(new RegExp(`${envVarName}\\s*=\\s*[^\\s]+`), updatedEnvVarLine)
        : `${envFileContents}\n${updatedEnvVarLine}`;
    };

    return existingEnvFile ? appendOrUpdate(existingEnvFile) : updatedEnvVarLine;
  }

  public static isAppInsightsEnabled(): boolean {
    const appInsightsConifg = Config.getValue(ConfigKey.AppInsightsEnabled);
    return ["1", "true", "😎"].includes(appInsightsConifg);
  }
}
