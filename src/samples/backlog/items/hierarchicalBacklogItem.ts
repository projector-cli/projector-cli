import { BacklogItem, BacklogItemType } from "../../../models";

const now = new Date().toISOString();

export const hierarchicalBacklogItem: BacklogItem = {
  name: `Sample Epic ${now}`,
  type: BacklogItemType.Epic,
  description: `This is my sample epic created on ${now}`,
  children: [
    {
      name: `Sample Feature ${now}`,
      type: BacklogItemType.Feature,
      description: "This is my sample feature",
      children: [
        {
          name: `Sample Story ${now}`,
          type: BacklogItemType.Story,
          description: "This is my sample story",
          acceptanceCriteria: [
            "This is my acceptance criteria 1",
            "This is my acceptance criteria 2",
            "This is my acceptance criteria 3",
          ],
          children: [
            {
              name: `Sample Task ${now}`,
              type: BacklogItemType.Task,
              description: "This is my sample task",
            },
            {
              name: `Sample Bug ${now}`,
              type: BacklogItemType.Bug,
              description: "This is my sample bug",
              acceptanceCriteria: ["The bug is fixed"],
            },
          ],
        },
      ],
    },
  ],
};
