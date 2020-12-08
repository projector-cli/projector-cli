import { BacklogItem, BacklogItemType } from "../models";
import { AzureDevOpsFieldName } from "../services/agile/providers/azureDevOps/azureDevOpsFieldName";
import { AzureDevOpsWorkItemType } from "../services/agile/providers/azureDevOps/azureDevOpsWorkItemType";
import { AzDOJsonPatchDocument, AzDoOp } from "../services/agile/providers/azureDevOps/jsonPatchDocument";

interface FieldValuePair {
  field: AzureDevOpsFieldName;
  value?: string;
}
export class AzureDevOpsUtils {
  public static createPatchDocument(backlogItem: BacklogItem, parentUrl?: string): AzDOJsonPatchDocument {
    const pairs = this.createFieldValuePairs(backlogItem);

    // Only include pairs whose value is defined
    const document: AzDOJsonPatchDocument = pairs
      .filter((pair) => pair.value)
      .map((pair: FieldValuePair) => {
        return {
          op: AzDoOp.Add,
          path: `/fields/${pair.field}`,
          value: pair.value as string,
        };
      });

    if (parentUrl) {
      document.push({
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
      });
    }

    return document;
  }

  public static getWorkItemType(backlogItemType: BacklogItemType): AzureDevOpsWorkItemType {
    switch (backlogItemType) {
      case BacklogItemType.Task:
        return AzureDevOpsWorkItemType.Task;
      case BacklogItemType.Story:
        return AzureDevOpsWorkItemType.UserStory;
      case BacklogItemType.Feature:
        return AzureDevOpsWorkItemType.Feature;
      case BacklogItemType.Epic:
        return AzureDevOpsWorkItemType.Epic;
      case BacklogItemType.Bug:
        return AzureDevOpsWorkItemType.Bug;
      default:
        throw new Error(`Unsupported backlog item type: ${backlogItemType}`);
    }
  }

  public static getBacklogItemType(workItemType: AzureDevOpsWorkItemType): BacklogItemType {
    switch (workItemType) {
      case AzureDevOpsWorkItemType.Task:
        return BacklogItemType.Task;
      case AzureDevOpsWorkItemType.UserStory:
        return BacklogItemType.Story;
      case AzureDevOpsWorkItemType.Feature:
        return BacklogItemType.Feature;
      case AzureDevOpsWorkItemType.Epic:
        return BacklogItemType.Epic;
      case AzureDevOpsWorkItemType.Bug:
        return BacklogItemType.Bug;
      default:
        throw new Error(`Unsupported backlog item type: ${workItemType}`);
    }
  }

  private static createFieldValuePairs(backlogItem: BacklogItem): FieldValuePair[] {
    const { name, description, acceptanceCriteria } = backlogItem;
    return [
      {
        field: AzureDevOpsFieldName.title,
        value: name,
      },
      {
        field: AzureDevOpsFieldName.description,
        value: description,
      },
      {
        field: AzureDevOpsFieldName.acceptanceCriteria,
        value: this.stringifyAcceptanceCriteria(acceptanceCriteria),
      },
    ];
  }

  private static stringifyAcceptanceCriteria(acceptanceCriteria?: string[]): string | undefined {
    if (!acceptanceCriteria) {
      return undefined;
    }

    const acceptanceCriteriaLines = acceptanceCriteria.map((line: string) => `<li>${line}</li>`).join("");

    return `<div><ul>${acceptanceCriteriaLines}</ul></div>`;
  }
}
