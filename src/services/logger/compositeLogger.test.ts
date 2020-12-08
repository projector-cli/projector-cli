import { Properties } from "../../models";
import { ServiceSimulator } from "../../test";
import { CompositeLogger } from "./compositeLogger";

describe("Composite Logger", () => {
  it("calls each of the logger functions", () => {
    const mockLogger1 = ServiceSimulator.createTestLogger();
    const mockLogger2 = ServiceSimulator.createTestLogger();

    const logger = new CompositeLogger([mockLogger1, mockLogger2]);

    const message = "my message";
    const properties: Properties = {
      prop: "my prop",
    };

    logger.debug(message, properties);
    logger.log(message, properties);
    logger.warn(message, properties);
    logger.error(message, properties);
    logger.logHeader(message, properties);

    expect(mockLogger1.debug).toBeCalledWith(message, properties);
    expect(mockLogger2.debug).toBeCalledWith(message, properties);

    expect(mockLogger1.log).toBeCalledWith(message, properties);
    expect(mockLogger2.log).toBeCalledWith(message, properties);

    expect(mockLogger1.warn).toBeCalledWith(message, properties);
    expect(mockLogger2.warn).toBeCalledWith(message, properties);

    expect(mockLogger1.error).toBeCalledWith(message, properties);
    expect(mockLogger2.error).toBeCalledWith(message, properties);

    expect(mockLogger1.logHeader).toBeCalledWith(message, properties);
    expect(mockLogger2.logHeader).toBeCalledWith(message, properties);
  });
});
