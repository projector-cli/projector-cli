import { BacklogItemTemplate } from "../../models";
import { hierarchicalBacklogItem, userStory } from "./items";

export const exampleBacklogItemTemplate: BacklogItemTemplate = {
  name: "example",
  description: "",
  path: "/",
  items: [userStory, hierarchicalBacklogItem],
};
