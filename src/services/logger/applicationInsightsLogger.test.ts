import { SeverityLevel } from "applicationinsights/out/Declarations/Contracts";
import { Properties } from "../../models";
import { ApplicationInsightsLogger } from "./applicationInsightsLogger";
jest.mock("applicationinsights");
import { TelemetryClient } from "applicationinsights";

describe("App Insights Logger suites", () => {
  describe("no properties on ApplicationInsightsLogger", () => {
    let client = new TelemetryClient();
    let logger = new ApplicationInsightsLogger(client);

    beforeEach(() => {
      client = new TelemetryClient();
      logger = new ApplicationInsightsLogger(client);
    });

    it.each([
      [logger.debug, SeverityLevel.Verbose],
      [logger.log, SeverityLevel.Information],
      [logger.warn, SeverityLevel.Warning],
      [logger.error, SeverityLevel.Error],
    ])(
      "logs message at $logMethod.name level with properties",
      (logMethod: (message: string, properties?: Properties) => void, severity: SeverityLevel) => {
        const message = `my ${logMethod.name} message`;
        const properties: Properties = {
          level: logMethod.name,
        };

        logMethod(message, properties);

        expect(TelemetryClient.prototype.trackTrace).toBeCalledWith({
          message,
          severity,
          properties,
        });
      },
    );
  });

  describe("default properties", () => {
    let client = new TelemetryClient();
    const defaultProperties: Properties = {
      myProp: "myVal",
    };
    let logger = new ApplicationInsightsLogger(client, defaultProperties);

    beforeEach(() => {
      client = new TelemetryClient();
      logger = new ApplicationInsightsLogger(client, defaultProperties);
    });

    it.each([
      [logger.debug, SeverityLevel.Verbose],
      [logger.log, SeverityLevel.Information],
      [logger.warn, SeverityLevel.Warning],
      [logger.error, SeverityLevel.Error],
    ])(
      "logs message at $logMethod.name level with properties",
      (logMethod: (message: string, properties?: Properties) => void, severity: SeverityLevel) => {
        const message = `my ${logMethod.name} message`;
        const properties: Properties = {
          level: logMethod.name,
        };

        logMethod(message, properties);

        const expectedProperties: Properties = {
          ...defaultProperties,
          ...properties,
        };

        expect(TelemetryClient.prototype.trackTrace).toBeCalledWith({
          message,
          severity,
          properties: expectedProperties,
        });
      },
    );
  });
});
