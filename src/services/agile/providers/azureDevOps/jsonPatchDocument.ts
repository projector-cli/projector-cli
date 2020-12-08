export enum AzDoOp {
  Add = "add",
}

export interface JsonFieldPatch {
  op: AzDoOp;
  path: string;
  from?: string;
  value: unknown;
}

export type AzDOJsonPatchDocument = JsonFieldPatch[];
