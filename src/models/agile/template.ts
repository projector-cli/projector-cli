import { BacklogItem } from "./backlogItem";

export interface Template {
  name: string;
  description: string;
  items: BacklogItem[];
}
