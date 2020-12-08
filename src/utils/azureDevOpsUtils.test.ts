import { BacklogItem, BacklogItemType } from "../models";
import { AzureDevOpsFieldName } from "../services/agile/providers/azureDevOps/azureDevOpsFieldName";
import { AzureDevOpsUtils } from "./azureDevOpsUtils";
import { AzureDevOpsWorkItemType } from "../services/agile/providers/azureDevOps/azureDevOpsWorkItemType";
import { AzDOJsonPatchDocument, AzDoOp } from "../services/agile/providers/azureDevOps/jsonPatchDocument";

describe("Azure DevOps Utils", () => {
  it("creates a patch document from a backlog item", () => {
    const item: BacklogItem = {
      name: "My item",
      type: BacklogItemType.Story,
      description: "My description",
      acceptanceCriteria: ["My acceptance criteria"],
    };

    const expectedPatchDocument: AzDOJsonPatchDocument = [
      {
        op: AzDoOp.Add,
        path: `/fields/${AzureDevOpsFieldName.title}`,
        value: item.name,
      },
      {
        op: AzDoOp.Add,
        path: `/fields/${AzureDevOpsFieldName.description}`,
        value: item.description,
      },
      {
        op: AzDoOp.Add,
        path: `/fields/${AzureDevOpsFieldName.acceptanceCriteria}`,
        value: `<div><ul><li>${item.acceptanceCriteria![0]}</li></ul></div>`,
      },
    ];

    expect(AzureDevOpsUtils.createPatchDocument(item)).toEqual(expectedPatchDocument);
  });

  it("creates a patch document from a backlog item with a parent url", () => {
    const item: BacklogItem = {
      name: "My item",
      type: BacklogItemType.Story,
      description: "My description",
      acceptanceCriteria: ["My acceptance criteria"],
    };
    const parentUrl = "https://parent.com";

    const expectedPatchDocument: AzDOJsonPatchDocument = [
      {
        op: AzDoOp.Add,
        path: `/fields/${AzureDevOpsFieldName.title}`,
        value: item.name,
      },
      {
        op: AzDoOp.Add,
        path: `/fields/${AzureDevOpsFieldName.description}`,
        value: item.description,
      },
      {
        op: AzDoOp.Add,
        path: `/fields/${AzureDevOpsFieldName.acceptanceCriteria}`,
        value: `<div><ul><li>${item.acceptanceCriteria![0]}</li></ul></div>`,
      },
      {
        op: AzDoOp.Add,
        path: "/relations/-",
        value: {
          rel: "System.LinkTypes.Hierarchy-Reverse",
          url: parentUrl,
          attributes: {
            isLocked: false,
            name: "Parent",
          },
        },
      },
    ];

    expect(AzureDevOpsUtils.createPatchDocument(item, parentUrl)).toEqual(expectedPatchDocument);
  });

  it("maps azdo work item type to backlog item type", () => {
    expect(AzureDevOpsUtils.getBacklogItemType(AzureDevOpsWorkItemType.Epic)).toEqual(BacklogItemType.Epic);
    expect(AzureDevOpsUtils.getBacklogItemType(AzureDevOpsWorkItemType.Feature)).toEqual(BacklogItemType.Feature);
    expect(AzureDevOpsUtils.getBacklogItemType(AzureDevOpsWorkItemType.UserStory)).toEqual(BacklogItemType.Story);
    expect(AzureDevOpsUtils.getBacklogItemType(AzureDevOpsWorkItemType.Task)).toEqual(BacklogItemType.Task);
    expect(AzureDevOpsUtils.getBacklogItemType(AzureDevOpsWorkItemType.Bug)).toEqual(BacklogItemType.Bug);
    expect(() => AzureDevOpsUtils.getBacklogItemType("" as AzureDevOpsWorkItemType)).toThrow();
  });

  it("maps backlog item type to azdo work item type", () => {
    expect(AzureDevOpsUtils.getWorkItemType(BacklogItemType.Epic)).toEqual(AzureDevOpsWorkItemType.Epic);
    expect(AzureDevOpsUtils.getWorkItemType(BacklogItemType.Feature)).toEqual(AzureDevOpsWorkItemType.Feature);
    expect(AzureDevOpsUtils.getWorkItemType(BacklogItemType.Story)).toEqual(AzureDevOpsWorkItemType.UserStory);
    expect(AzureDevOpsUtils.getWorkItemType(BacklogItemType.Task)).toEqual(AzureDevOpsWorkItemType.Task);
    expect(AzureDevOpsUtils.getWorkItemType(BacklogItemType.Bug)).toEqual(AzureDevOpsWorkItemType.Bug);
    expect(() => AzureDevOpsUtils.getWorkItemType("" as BacklogItemType)).toThrow();
  });
});
