import { TelemetryClient } from "applicationinsights";
import { SeverityLevel } from "applicationinsights/out/Declarations/Contracts";
import { Properties } from "../../models";
import { BaseLogger } from "./baseLogger";

export class ApplicationInsightsLogger extends BaseLogger {
  private client: TelemetryClient;

  constructor(client: TelemetryClient, defaultProperties?: Properties) {
    super(defaultProperties);
    this.client = client;
  }

  debug = (message: string, properties?: Properties): void => {
    this.writeLog(SeverityLevel.Verbose, message, properties);
  };

  log = (message: string, properties?: Properties): void => {
    this.writeLog(SeverityLevel.Information, message, properties);
  };

  warn = (message: string, properties?: Properties): void => {
    this.writeLog(SeverityLevel.Warning, message, properties);
  };

  error = (message: string, properties?: Properties): void => {
    this.writeLog(SeverityLevel.Error, message, properties);
  };

  /**
   * Write log to AppInsights with specified severity level.
   *
   * @param {SeverityLevel} severity The severity at which to send the log
   * @param {string} message The log to send to AppInsights
   * @param {Properties | undefined} properties Custom properties to add - see https://github.com/Microsoft/ApplicationInsights-JS#sending-telemetry-to-the-azure-portal
   */
  private writeLog(severity: SeverityLevel, message: string, properties?: Properties): void {
    /* eslint-disable prettier/prettier */
    const props = this.defaultProperties
      ? {
        ...this.defaultProperties,
        ...properties,
      }
      : properties;
    /* eslint-enable prettier/prettier */

    this.client.trackTrace({
      message,
      severity,
      properties: props,
    });
  }
}
