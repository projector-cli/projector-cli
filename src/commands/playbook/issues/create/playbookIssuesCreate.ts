import { Command, urlCommand } from "../../../../extensions";
import { Config } from "../../../../utils";

const playbookLink = Config.getLink("playbook");

export const playbookIssueCreateCommandFactory = (): Command => {
  return urlCommand({
    name: "create",
    description: "Create a playbook issue",
    url: `${playbookLink.url}/issues/new/choose`,
  });
};
