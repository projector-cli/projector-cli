import { Filetype } from "../models/general/filetype";

export class FileConstants {
  public static readonly defaultConfigurationExtension = ".yml";
  public static readonly configFileName = "projector.json";
  public static readonly defaultFileType = Filetype.Yml;
  public static readonly envFileName = ".projector.env";
  public static readonly importDirectory = "imports";
  public static readonly parametersFileName = "parameters.json";
  public static readonly templatesFileName = "templates.json";
}
