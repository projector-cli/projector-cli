export * from "./example";
export * from "./empty";
export * from "./items";
import { emptyBacklogItemTemplate } from "./empty";
import { exampleBacklogItemTemplate } from "./example";

export const sampleWorkItemTemplates = [emptyBacklogItemTemplate, exampleBacklogItemTemplate];
