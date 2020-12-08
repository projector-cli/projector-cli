import { ConsoleLogger } from "./consoleLogger";

describe("Console Logger", () => {
  const logger = new ConsoleLogger();

  it.each([logger.debug, logger.log, logger.warn, logger.error])(
    "calls console function $logFunction.name",
    (logFunction: (message: string) => void) => {
      const original: (message: string) => void = logFunction;
      const mockFn = jest.fn();
      logFunction = mockFn;

      const message = "my message";

      logFunction(message);
      expect(mockFn).toBeCalledWith(message);
      logFunction = original;
    },
  );
});
