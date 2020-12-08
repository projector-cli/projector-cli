import { InterpolatorService, Parameters } from "../../models";

export class ParameterizedRegexInterpolator implements InterpolatorService {
  private static variableRegex = /\${([a-zA-Z:_]+)}/g;
  private static envVarKey = "env:";
  private parameters: Parameters;

  public constructor(parameters: Parameters) {
    this.parameters = parameters;
  }

  public interpolate(original: string): string {
    const matches = original.match(ParameterizedRegexInterpolator.variableRegex);
    if (!matches) {
      return original;
    }

    // Since we do a global search and replace, we only need to see each match once
    const matchSet = new Set(matches);
    for (const match of matchSet) {
      const value = this.getVariableValue(match);
      original = original.replace(new RegExp(match.replace("$", "\\$"), "g"), value);
    }
    return original;
  }

  private getVariableValue(match: string): string {
    const variableKey = match.replace("$", "").replace("{", "").replace("}", "");

    if (variableKey.startsWith(ParameterizedRegexInterpolator.envVarKey)) {
      // Means variable looks like ${env:MY_VARIABLE} and MY_VARIABLE should exist in env vars
      const envVarName = variableKey.replace(ParameterizedRegexInterpolator.envVarKey, "");
      const envVarValue = process.env[envVarName];
      if (!envVarValue) {
        throw new Error(`Environment variable '${envVarName}' not found`);
      }

      return envVarValue;
    } else if (this.parameters[variableKey]) {
      // Check to see if variable provided in parameters
      return this.parameters[variableKey];
    } else {
      throw new Error(`Variable '${variableKey}' not found in parameters`);
    }
  }
}
