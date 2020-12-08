import { BacklogItem, BacklogItemType } from "../../../models";

export const userStory: BacklogItem = {
  name:
    "As a developer, I have automated linting to enforce code style for the protected branches of the ______ project",
  type: BacklogItemType.Story,
  description: "We need linting. Linting is good",
  acceptanceCriteria: [
    "There is a single command to run linting from the terminal",
    "Linting is triggered on all pull requests to protected branches",
    "Linting failure causes CI pipeline to fail",
    "CI failure blocks PR merge",
  ],
  assignedTo: "john.stockton@example.com",
  children: [
    {
      name: "Configure linter",
      type: BacklogItemType.Task,
    },
    {
      name: "Set up linting in CI pipeline",
      type: BacklogItemType.Task,
    },
  ],
};
