// We will make the assumption that all env vars are set
// when the Config package is imported, since src/index.ts
// loads environment variables from dotenv as its first
// action. If we have a need for more dynamic configuration
// (reloading config to account for newly set env vars), we
// can use `require` and revisit then. However, using `require`
// is not recommended for TypeScript and makes simulating a
// file system difficult in tests since we will then not
// be able to find the `config` module

const envVarValue1 = "env var 1";
const envVarValue2 = "env var 2";
process.env.TEST_CONFIG_ENV_VAR_1 = envVarValue1;
process.env.TEST_CONFIG_ENV_VAR_2 = envVarValue2;

import { ConfigKey } from "../constants";
import { Config } from "./configUtils";

describe("Config Utils", () => {
  describe("getValue", () => {
    it("gets a value from the test configuration json file", () => {
      // Act & Assert
      expect(Config.getValue("test.variable" as ConfigKey)).toEqual("json");
    });

    it("gets a value from the default configuration json file", () => {
      // Act & Assert
      expect(Config.getValue(ConfigKey.PlaybookRepoName)).toEqual("code-with-engineering-playbook");
    });

    it("gets a value from environment variables", () => {
      // Act & Assert
      expect(Config.getValue("test.variable2" as ConfigKey)).toEqual(envVarValue2);
    });

    it("uses environment variable over json file if configured", () => {
      // Act & Assert
      expect(Config.getValue("test.variable1" as ConfigKey)).toEqual(envVarValue1);
    });
  });

  describe("getValueWithDefault", () => {
    it("gets a default if no configured value", () => {
      // Setup
      const defaulValue = "default";

      // Act & Assert
      expect(Config.getValueWithDefault("fake" as ConfigKey, defaulValue)).toEqual(defaulValue);
    });
  });

  describe("getEnvironmentVariableName", () => {
    it("gets an environment variable name that is defined", () => {
      expect(Config.getEnvironmentVariableName("test.variable1" as ConfigKey)).toEqual("TEST_CONFIG_ENV_VAR_1");
      expect(Config.getEnvironmentVariableName("test.variable2" as ConfigKey)).toEqual("TEST_CONFIG_ENV_VAR_2");
    });

    it("throws error for config key that is not defined", () => {
      expect(() => Config.getEnvironmentVariableName("fake" as ConfigKey)).toThrow();
    });
  });

  describe("getUpdatedEnvFileContents", () => {
    it("updates environment variable in place", () => {
      const originalEnvFile = ["TEST_CONFIG_ENV_VAR_1=1", "TEST_CONFIG_ENV_VAR_2=2"].join("\n");

      const expectedResult = ["TEST_CONFIG_ENV_VAR_1=3", "TEST_CONFIG_ENV_VAR_2=2"].join("\n");

      const actual = Config.getUpdatedEnvFileContents("test.variable1" as ConfigKey, "3", originalEnvFile);
      expect(actual).toEqual(expectedResult);
    });

    it("appends environment variable if non-existent", () => {
      const originalEnvFile = ["TEST_CONFIG_ENV_VAR_2=2"].join("\n");

      const expectedResult = ["TEST_CONFIG_ENV_VAR_2=2", "TEST_CONFIG_ENV_VAR_1=3"].join("\n");

      const actual = Config.getUpdatedEnvFileContents("test.variable1" as ConfigKey, "3", originalEnvFile);
      expect(actual).toEqual(expectedResult);
    });

    it("creates new content if none", () => {
      const expectedResult = ["TEST_CONFIG_ENV_VAR_1=3"].join("\n");

      const actual = Config.getUpdatedEnvFileContents("test.variable1" as ConfigKey, "3");
      expect(actual).toEqual(expectedResult);
    });
  });
});
