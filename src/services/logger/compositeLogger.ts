import { Logger, Properties } from "../../models";

/**
 * Logger for multiple destinations
 */
export class CompositeLogger implements Logger {
  private loggers: Logger[];

  public constructor(loggers: Logger[]) {
    this.loggers = loggers;
  }

  /**
   * Log a message at debug severity level for all child loggers
   *
   * @param {string} message Message to log at debug severity level
   * @param {Properties|undefined} properties Logging properties
   */
  public debug(message: string, properties?: Properties): void {
    this.loggers.forEach((logger: Logger) => logger.debug(message, properties));
  }

  /**
   * Log a message at info severity level for all child loggers
   *
   * @param {string} message Message to log at info severity level
   * @param {Properties|undefined} properties Logging properties
   */
  public log(message: string, properties?: Properties): void {
    this.loggers.forEach((logger: Logger) => logger.log(message, properties));
  }

  /**
   * Log a message at warn severity level for all child loggers
   *
   * @param {string} message Message to log at warn severity level
   * @param {Properties|undefined} properties Logging properties
   */
  public warn(message: string, properties?: Properties): void {
    this.loggers.forEach((logger: Logger) => logger.warn(message, properties));
  }

  /**
   * Log a message at error severity level for all child loggers
   *
   * @param {string} message Message to log at debug severity level
   * @param {Properties|undefined} properties Logging properties
   */
  public error(message: string, properties?: Properties): void {
    this.loggers.forEach((logger: Logger) => logger.error(message, properties));
  }

  /**
   * Log a header message to all child loggers
   *
   * @param {string} message Header message
   * @param {Properties|undefined} properties Logging properties
   */
  public logHeader(message: string, properties?: Properties): void {
    this.loggers.forEach((logger: Logger) => logger.logHeader(message, properties));
  }

  /**
   * Adds default properties to all child loggers
   *
   * @param {Properties} properties Default properties to add
   */
  public addDefaultProperties(properties: Properties): void {
    this.loggers.forEach((logger: Logger) => logger.addDefaultProperties(properties));
  }
}
