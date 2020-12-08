import { TelemetryClient } from "applicationinsights";
import { MetricTelemetry } from "applicationinsights/out/Declarations/Contracts";
import { Metrics, Properties } from "../../models";

export class ApplicationInsightsMetrics implements Metrics {
  private localMetricCache: Map<string, number>;
  private client: TelemetryClient;
  private defaultProperties?: Properties;

  constructor(client: TelemetryClient, defaultProperties?: Properties) {
    this.localMetricCache = new Map<string, number>();
    this.client = client;
    this.defaultProperties = defaultProperties;
  }

  public getProperties(): Properties | undefined {
    return this.defaultProperties;
  }

  /**
   * Emits a metric event, which sets the value of the metric to the value passed in. Useful for Gauge style metrics.
   *
   * @param {string} metricName  The target metric name.
   * @param {number} value The current value of the metric.
   * @param {Properties | undefined} properties A string/string map of additional properties to describe this metric series.
   */
  public set(metricName: string, value: number, properties?: Properties): void {
    const key = this.getKey(metricName, properties);
    this.localMetricCache.set(key, value);

    this.trackMetric({
      name: metricName,
      value,
      properties,
    });
  }

  /**
   * Emits a metric event, which increments the value of the metric by 1. Useful for Counter style metrics.
   *
   * @param {string} metricName The target metric name.
   * @param {Properties | undefined} properties A string/string map of additional properties to describe this metric series.
   */
  public increment(metricName: string, properties?: Properties): void {
    // increment the given metric by 1
    this.incrementBy(metricName, 1, properties);
  }

  /**
   * Emits a metric event, which increments the value of the metric by N. Useful for Counter style metrics.
   *
   * @param {string} metricName The target metric name.
   * @param {number} value The amount you want to increment the specified metric
   * @param {Properties | undefined} properties A string/string map of additional properties to describe this metric series.
   */
  public incrementBy(metricName: string, value: number, properties?: Properties): void {
    const key = this.getKey(metricName, properties);
    let oldValue = this.localMetricCache.get(key);

    if (oldValue === undefined) {
      oldValue = 0;
    }

    oldValue += value;
    this.localMetricCache.set(key, value);

    this.trackMetric({
      name: metricName,
      value: oldValue,
      properties,
    });
  }

  /**
   * Immediately sends any metrics that may not yet have been sent to Application Insights. Call this on program exit or
   * crash to ensure that all metrics have been remotely recorded.
   */
  public flush(): void {
    this.client.flush();
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

  private trackMetric(telemetry: MetricTelemetry): void {
    const { properties } = telemetry;
    const props = this.defaultProperties
      /* eslint-disable prettier/prettier */
      ? {
        ...this.defaultProperties,
        ...properties,
      }
      : properties;
      /* eslint-enable prettier/prettier */

    this.client.trackMetric({
      ...telemetry,
      properties: props,
    });
  }

  /**
   * Gets a key for the metric, for use in the in memory store.
   *
   * @param {string} metricName name of the metric
   * @param {Properties} properties key/value pairs of properties to further describe the metric.
   * @returns {string} the key for use in the memory storage.
   */
  private getKey(metricName: string, properties?: Properties | undefined): string {
    return `${metricName}` + properties ? `${JSON.stringify(properties)}` : "";
  }
}
