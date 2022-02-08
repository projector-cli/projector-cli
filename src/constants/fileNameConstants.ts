import path from "path";
import { Filetype } from "../models";

export class FileConstants {
  public static readonly defaultConfigurationExtension = ".yml";
  public static readonly configFileName = "projector.json";
  public static readonly defaultFileType = Filetype.Yml;
  public static readonly envFileName = ".projector.env";
  public static readonly importDirectory = "imports";
  public static readonly parametersFileName = "parameters.json";
  public static readonly templatesFileName = "templates.json";
  public static readonly templatesPath = path.join(".projector", "workItemTemplates");
}
