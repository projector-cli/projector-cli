export interface GitHubIssue {
  id: number;
  title: string;
  number?: number;
  body?: string;
  node_id?: string;
}

export interface GitHubMilestone {
  title: string;
  id: number;
  description?: string | null;
  due_on: string | null;
  number: number;
}

export interface GitHubLabel {
  id: number;
  name: string;
  color?: string;
  description?: string | null;
}
