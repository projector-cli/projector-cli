import path from "path";
import { RepoTemplate } from "../../models";

export const emptyItemTemplate: RepoTemplate = {
  name: "empty",
  fileName: "empty.json",
  filePath: path.sep,
};
