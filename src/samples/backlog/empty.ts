import { BacklogItemTemplate, BacklogItemType } from "../../models";

export const emptyBacklogItemTemplate: BacklogItemTemplate = {
  name: "empty",
  description: "Empty Backlog Items",
  path: "/",
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
