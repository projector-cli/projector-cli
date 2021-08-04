/* eslint-disable @typescript-eslint/no-explicit-any */
import { AgileProviderOptions, Logger } from "../models";
import { AgileService, AgileServiceProvider, InputService } from "../services";

export class AgileServiceFactory {
  private static registry: { [providerName: string]: any } = {};

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public static register(providerName: AgileServiceProvider, service: any): void {
    AgileServiceFactory.registry[providerName] = service;
  }

  public static get(options: AgileProviderOptions, inputService: InputService, logger: Logger): AgileService {
    const { agileProvider } = options;
    const service = AgileServiceFactory.registry[agileProvider];

    if (!service) {
      throw new Error(
        `Agile service ${agileProvider} not defined. Options are ${Object.keys(this.registry).join(",")}`,
      );
    }
    return new service(options, inputService, logger);
  }
}
