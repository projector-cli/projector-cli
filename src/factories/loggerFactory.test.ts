import { LoggerProvider } from "../services";
import { LoggerFactory } from "./loggerFactory";
import { ServiceSimulator } from "../test";

describe("Logger Factory", () => {
  it("registers and gets a provider", () => {
    const logger = ServiceSimulator.createTestLogger();
    const provider = "simulated" as LoggerProvider;
    LoggerFactory.register(provider, logger);
    expect(LoggerFactory.get(provider)).toEqual(logger);
  });

  it("get throws error if provider not registered", () => {
    expect(() => LoggerFactory.get("fake" as LoggerProvider)).toThrow();
  });
});
