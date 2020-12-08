import { MetricsProvider } from "../services";
import { MetricsFactory } from "./metricsFactory";
import { ServiceSimulator } from "../test";

describe("Metrics Factory", () => {
  it("registers and gets a provider", () => {
    const metrics = ServiceSimulator.createTestMetrics();
    const provider = "simulated" as MetricsProvider;
    MetricsFactory.register(provider, metrics);
    expect(MetricsFactory.get(provider)).toEqual(metrics);
  });

  it("get throws error if provider not registered", () => {
    expect(() => MetricsFactory.get("fake" as MetricsProvider)).toThrow();
  });

  it("getsIfRegistered gets undefined if provider not registered", () => {
    expect(MetricsFactory.getIfRegistered("fake" as MetricsProvider)).toBeUndefined();
  });
});
