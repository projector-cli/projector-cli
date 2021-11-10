import { pjrCommandFactory } from "./pjr";
import { CliSimulator, ServiceSimulator } from "../test";

jest.mock("figlet");
import figlet from "figlet";

describe("pjr", () => {
  it("calls all the right functions", async () => {
    const figletText = "figlet text";

    figlet.textSync = jest.fn(() => figletText);

    const inputService = ServiceSimulator.createTestInputService({
      multiChoiceAnswer: "",
    });
    const serviceCollection = ServiceSimulator.createTestServiceCollection({
      inputService,
    });

    const pjr = pjrCommandFactory();

    await pjr.setServiceCollection(serviceCollection).parseAsync(CliSimulator.createArgs());

    expect(figlet.textSync).toBeCalledWith("projector");
    expect(inputService.multiChoiceQuestion).toBeCalled();
  });
});
