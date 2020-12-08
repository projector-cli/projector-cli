import { CliSimulator, ServiceSimulator } from "../test";
import { versionCommandFactory } from "./version";

describe("version", () => {
  it("prints the version", async () => {
    const serviceCollection = ServiceSimulator.createTestServiceCollection();
    const version = versionCommandFactory();

    await version.setServiceCollection(serviceCollection).parseAsync(CliSimulator.createArgs());
    expect(serviceCollection.logger.log).toBeCalledWith(expect.stringMatching(/[0-9]+\.[0-9]+\.[0-9]+/));
  });
});
