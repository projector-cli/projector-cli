import { Logger, Properties } from "../../models";

export abstract class BaseLogger implements Logger {
  protected defaultProperties?: Properties;

  constructor(defaultProperties?: Properties) {
    this.defaultProperties = defaultProperties;
  }

  public getProperties(): Properties | undefined {
    return this.defaultProperties;
  }

  public logHeader(message: string): void {
    this.log(`\n${message}`);
    this.log("-".repeat(message.length));
  }

  public addDefaultProperties(properties: Properties): void {
    if (this.defaultProperties) {
      this.defaultProperties = {
        ...this.defaultProperties,
        ...properties,
      };
    } else {
      this.defaultProperties = properties;
    }
  }

  abstract debug: (message: string, properties?: Properties) => void;
  abstract log: (message: string, properties?: Properties) => void;
  abstract warn: (message: string, properties?: Properties) => void;
  abstract error: (message: string, properties?: Properties) => void;
}
