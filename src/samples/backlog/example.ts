import { Template } from "../../models";
import { hierarchicalBacklogItem, userStory } from "./items";

export const exampleTemplate: Template = {
  name: "example",
  description: "",
  items: [userStory, hierarchicalBacklogItem],
};
