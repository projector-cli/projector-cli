import { Parameters } from "../models";

export class Interpolator {
  private static variableRegex = /\${([a-zA-Z:_]+)}/g;
  private static envVarKey = "env:";

  public static interpolate(original: string, parameters?: Parameters): string {
    const matches = original.match(this.variableRegex);
    if (!matches) {
      return original;
    }

    // Since we do a global search and replace, we only need to see each match once
    const matchSet = new Set(matches);
    for (const match of matchSet) {
      const value = this.getVariableValue(match, parameters);
      original = original.replace(new RegExp(match.replace("$", "\\$"), "g"), value);
    }
    return original;
  }

  private static getVariableValue(match: string, parameters?: Parameters): string {
    const variableKey = match.replace("$", "").replace("{", "").replace("}", "");

    if (variableKey.startsWith(this.envVarKey)) {
      // Means variable looks like ${env:MY_VARIABLE} and MY_VARIABLE should exist in env vars
      const envVarName = variableKey.replace(this.envVarKey, "");
      const envVarValue = process.env[envVarName];
      if (!envVarValue) {
        throw new Error(`Environment variable '${envVarName}' not found`);
      }

      return envVarValue;
    } else if (!parameters) {
      throw new Error(`Found ${match}, which matches the variable syntax, but did not receive any parameters`);
    } else if (parameters[variableKey]) {
      // Check to see if variable provided in parameters
      return parameters[variableKey];
    } else {
      throw new Error(`Variable '${variableKey}' not found in parameters`);
    }
  }
}
