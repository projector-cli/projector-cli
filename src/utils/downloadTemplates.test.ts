import { ServiceSimulator } from "../test";
import { downloadTemplates } from "./downloadTemplates";

describe("Download Templates", () => {
  const templates: { name: string }[] = [
    {
      name: "Template 1",
    },
    {
      name: "Template 2",
    },
  ];

  it("downloads templates with no template name or output path", async () => {
    const outputFileName = "output.txt";

    const inputService = ServiceSimulator.createTestInputService({
      answer: outputFileName,
      multiChoiceAnswer: templates[0].name,
      confirmAnswer: false,
    });
    const logger = ServiceSimulator.createTestLogger();
    const getTemplates = jest.fn(() => Promise.resolve(templates));
    const saveTemplate = jest.fn();

    await downloadTemplates(getTemplates, saveTemplate, inputService, logger);
    expect(getTemplates).toBeCalled();
    expect(saveTemplate).toBeCalled();
  });
});
