import { Properties } from "../../models";
import { SimulatorLogger } from "../../test";

describe("Base Logger", () => {
  it("header logs message and dashes", () => {
    const logger = new SimulatorLogger();
    const myHeader = "my header message";
    logger.logHeader(myHeader);
    expect(logger.log.mock.calls).toEqual([[`\n${myHeader}`], ["-".repeat(myHeader.length)]]);
  });

  it("adds default properties to pre-existing", () => {
    const initialDefaults = {
      myProp: "myVal",
    };

    const logger = new SimulatorLogger(initialDefaults);
    const properties: Properties = {
      myOtherProp: "myOtherVal",
    };

    logger.addDefaultProperties(properties);

    expect(logger.getProperties()).toEqual({
      myProp: "myVal",
      myOtherProp: "myOtherVal",
    });
  });

  it("adds default properties", () => {
    const logger = new SimulatorLogger();
    const properties: Properties = {
      myOtherProp: "myOtherVal",
    };

    logger.addDefaultProperties(properties);

    expect(logger.getProperties()).toEqual({
      myOtherProp: "myOtherVal",
    });
  });
});
