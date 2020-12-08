export enum RepoItemType {
  Directory = "Directory",
  File = "File",
}

export interface RepoItem {
  type: RepoItemType;
  name: string;
  path: string;
  content?: string;
  children?: RepoItem[];
}
