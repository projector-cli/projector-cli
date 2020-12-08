import { BacklogItem } from "./backlogItem";

export interface BacklogItemTemplate {
  name: string;
  description: string;
  path: string;
  items: BacklogItem[];
}
