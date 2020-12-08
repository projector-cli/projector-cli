import { Logger } from "../models";
import { LoggerProvider } from "../services";

export class LoggerFactory {
  private static registry: { [providerName: string]: Logger } = {};

  public static register(providerName: LoggerProvider, logger: Logger): void {
    LoggerFactory.registry[providerName] = logger;
  }

  public static get(providerName: LoggerProvider): Logger {
    const logger = LoggerFactory.registry[providerName];

    if (!logger) {
      throw new Error(
        `Logger service ${providerName} not defined. Options are ${Object.keys(this.registry).join(",")}`,
      );
    }

    return logger;
  }
}
