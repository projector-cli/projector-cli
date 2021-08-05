import { Template, BacklogItemType } from "../../models";

export const emptyTemplate: Template = {
  name: "empty",
  description: "Empty Backlog Items",
  items: [
    {
      name: "",
      type: BacklogItemType.Epic,
    },
    {
      name: "",
      type: BacklogItemType.Feature,
    },
    {
      name: "",
      type: BacklogItemType.Story,
    },
    {
      name: "",
      type: BacklogItemType.Task,
    },
    {
      name: "",
      type: BacklogItemType.Bug,
    },
  ],
};
