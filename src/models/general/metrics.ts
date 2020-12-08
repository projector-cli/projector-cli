import { Properties } from "./properties";

/**
 * Metrics telemetry client
 */
export interface Metrics {
  /**
   * Sets the value of a metric
   *
   * @param {string} metricName Metric name
   * @param {string} value Metric value
   * @param {Properties|undefined} properties Properties for metric instance
   */
  set: (metricName: string, value: number, properties?: Properties) => void;

  /**
   * Increment metric value by 1
   *
   * @param {string} metricName Metric name
   * @param {Properties|undefined} properties Properties for metric instance
   */
  increment: (metricName: string, properties?: Properties) => void;

  /**
   * Increments metric by specified value
   *
   * @param {string} metricName Metric name
   * @param {string} value Metric increment interval
   * @param {Properties|undefined} properties Properties for metric instance
   */
  incrementBy: (metricName: string, value: number, properties?: Properties) => void;

  /**
   * Flushes all pending metrics requests
   */
  flush: () => void;

  /**
   * Adds a default property to the metrics client
   *
   * @param {Properties} properties Default properties to add to client
   */
  addDefaultProperties: (properties: Properties) => void;
}
