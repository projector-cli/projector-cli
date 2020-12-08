import { BaseLogger } from "./baseLogger";

export class ConsoleLogger extends BaseLogger {
  debug = (message: string): void => {
    console.debug(message);
  };

  log = (message: string): void => {
    console.log(message);
  };

  warn = (message: string): void => {
    console.warn(message);
  };

  error = (message: string): void => {
    console.error(message);
  };
}
