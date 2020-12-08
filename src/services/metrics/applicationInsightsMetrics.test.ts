jest.mock("applicationinsights");
import { TelemetryClient } from "applicationinsights";
import { Properties } from "../../models";
import { ApplicationInsightsMetrics } from "./applicationInsightsMetrics";

describe("Application Insights Metrics", () => {
  const properties: Properties = {
    propName: "my property",
  };

  beforeEach(() => {
    TelemetryClient.prototype.trackMetric = jest.fn();
    TelemetryClient.prototype.flush = jest.fn();
  });

  it("sets a metric value", () => {
    const metricName = "my-custom-metric";
    const client = new TelemetryClient();

    const metrics = new ApplicationInsightsMetrics(client);
    const metricValue = 5;
    metrics.set(metricName, metricValue, properties);
    expect(TelemetryClient.prototype.trackMetric).toBeCalledWith({
      name: metricName,
      value: metricValue,
      properties,
    });
  });

  it("increments a metric", () => {
    const incrementMetricName = "my-incrementing-metric";
    const client = new TelemetryClient();

    const metrics = new ApplicationInsightsMetrics(client);
    metrics.increment(incrementMetricName, properties);

    expect(TelemetryClient.prototype.trackMetric).toBeCalledWith({
      name: incrementMetricName,
      value: 1,
      properties,
    });

    metrics.increment(incrementMetricName, properties);

    expect(TelemetryClient.prototype.trackMetric).toBeCalledWith({
      name: incrementMetricName,
      value: 2,
      properties,
    });
  });

  it("increments a metric by specified value", () => {
    const incrementMetricName = "my-incrementing-metric";
    const client = new TelemetryClient();

    const metrics = new ApplicationInsightsMetrics(client);
    const interval = 25;

    metrics.incrementBy(incrementMetricName, interval, properties);

    expect(TelemetryClient.prototype.trackMetric).toBeCalledWith({
      name: incrementMetricName,
      value: interval,
      properties,
    });

    metrics.incrementBy(incrementMetricName, interval, properties);

    expect(TelemetryClient.prototype.trackMetric).toBeCalledWith({
      name: incrementMetricName,
      value: interval * 2,
      properties,
    });
  });

  it("flushes the client", () => {
    const client = new TelemetryClient();
    const metrics = new ApplicationInsightsMetrics(client);

    metrics.flush();
    expect(TelemetryClient.prototype.flush).toBeCalled();
  });

  it("adds default properties to pre-existing properties", () => {
    const initialDefaults = {
      myProp: "myVal",
    };
    const client = new TelemetryClient();

    const metrics = new ApplicationInsightsMetrics(client, initialDefaults);
    const properties: Properties = {
      myOtherProp: "myOtherVal",
    };

    metrics.addDefaultProperties(properties);

    expect(metrics.getProperties()).toEqual({
      myProp: "myVal",
      myOtherProp: "myOtherVal",
    });
  });

  it("adds default properties", () => {
    const client = new TelemetryClient();
    const metrics = new ApplicationInsightsMetrics(client);
    const properties: Properties = {
      myOtherProp: "myOtherVal",
    };

    metrics.addDefaultProperties(properties);

    expect(metrics.getProperties()).toEqual({
      myOtherProp: "myOtherVal",
    });
  });
});
