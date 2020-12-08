import { Metrics } from "../models";
import { MetricsProvider } from "../services";

export class MetricsFactory {
  private static registry: { [providerName: string]: Metrics } = {};

  public static register(providerName: MetricsProvider, metrics: Metrics): void {
    this.registry[providerName] = metrics;
  }

  public static get(providerName: MetricsProvider): Metrics {
    const metrics = this.registry[providerName];

    if (!metrics) {
      throw new Error(
        `Metrics service ${providerName} not defined. Options are ${Object.keys(this.registry).join(",")}`,
      );
    }

    return metrics;
  }

  public static getIfRegistered(providerName: MetricsProvider): Metrics | undefined {
    return this.registry[providerName];
  }
}
