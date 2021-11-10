import { Template, PlaybookConfiguration, Downloadable } from "../../models";
import { DownloadablePlaybookService } from "./downloadablePlaybookService";

describe("Downloadable Playbook Service", () => {
  it("gets templates", async () => {
    const templateName = "template";

    const content: Template = {
      name: templateName,
      description: "description",
      items: [],
    };

    const configuration: PlaybookConfiguration = {
      playbookName: "sample-playbook",
      location: "https://www.github.com/projector-cli/playbook",
    };

    const playbookService = new DownloadablePlaybookService(
      async (_url: PlaybookConfiguration) => Promise.resolve([{ url: "https://www.example.com" }]),
      async (_downloadable: Downloadable) => Promise.resolve(content),
      configuration,
    );
    expect((await playbookService.getTemplates()).length).toBeTruthy();
  });
});
