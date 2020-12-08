import { Properties } from "./properties";

/**
 * Logger
 */
export interface Logger {
  /**
   * Log a message at debug severity level
   *
   * @param {string} message Message to log at debug severity level
   * @param {Properties|undefined} properties Logging properties
   */
  debug: (message: string, properties?: Properties) => void;

  /**
   * Log a message at info severity level
   *
   * @param {string} message Message to log at info severity level
   * @param {Properties|undefined} properties Logging properties
   */
  log: (message: string, properties?: Properties) => void;

  /**
   * Log a message at warn severity level
   *
   * @param {string} message Message to log at warn severity level
   * @param {Properties|undefined} properties Logging properties
   */
  warn: (message: string, properties?: Properties) => void;

  /**
   * Log a message at error severity level
   *
   * @param {string} message Message to log at debug severity level
   * @param {Properties|undefined} properties Logging properties
   */
  error: (message: string, properties?: Properties) => void;

  /**
   * Log a header message
   *
   * @param {string} message Header message
   * @param {Properties|undefined} properties Logging properties
   */
  logHeader: (message: string, properties?: Properties) => void;

  /**
   * Adds a default property to the logger
   *
   * @param {Properties} properties Default properties
   */
  addDefaultProperties: (properties: Properties) => void;
}
