import { mkdir, readFile, writeFile, readdir } from "fs/promises";
import { join } from "path";
import { Logger } from "../../models";
import { BaseEncodingOptions } from "fs";
import { FileConstants } from "../../constants";
import yaml from "yaml";
import { InterpolatorService } from "../interpolate";
import { StorageService } from "./storageService";

export class FileStorageService<T> implements StorageService<T> {
  private static encoding: BufferEncoding = "utf-8";
  private static readWriteOptions: BaseEncodingOptions = { encoding: FileStorageService.encoding };
  private readonly defaultWriteLocation: string;
  private readonly logger: Logger;
  private readonly interpolate: (content: string) => string;

  constructor(defaultWriteLocation: string, logger: Logger, interpolator?: InterpolatorService) {
    this.defaultWriteLocation = defaultWriteLocation;
    this.logger = logger;
    this.interpolate =
      interpolator?.interpolate ||
      function (content: string) {
        return content;
      };
  }

  public async read(name: string, directory?: string): Promise<T | undefined> {
    try {
      const path = directory ?? this.defaultWriteLocation;
      const fileName = FileStorageService.getFileName(name);
      const parse = FileStorageService.getFileParser(fileName);

      const filePath = join(path, fileName);
      const content = await readFile(filePath, FileStorageService.readWriteOptions);

      if (typeof content === "string") {
        const interpolated = this.interpolate(content);
        const object = parse(interpolated) as T;
        return object;
      } else {
        throw new Error(`File not utf-8 encoded: Read ${content}.`);
      }
    } catch (e) {
      if (e.code === "ENOENT") {
        return undefined;
      } else {
        throw e;
      }
    }
  }

  public async write(name: string, object: T, directory?: string): Promise<boolean> {
    const path = directory ?? this.defaultWriteLocation;
    await mkdir(path, { recursive: true });

    const fileName = FileStorageService.getFileName(name);
    const stringify = FileStorageService.getFileStringifier(fileName);
    const content = stringify(object);

    const filePath = join(path, fileName);

    try {
      await writeFile(filePath, content, FileStorageService.readWriteOptions);
    } catch (err) {
      this.logger.log(`Could not write file ${fileName} to ${path}:`);
      this.logger.log(err);

      return false;
    }

    return true;
  }

  public async list(location?: string): Promise<string[]> {
    const path = join(process.cwd(), location || "");
    return readdir(path);
  }

  private static getFileName(fileName: string): string {
    if (FileStorageService.isYamlFile(fileName) || FileStorageService.isJsonFile(fileName)) {
      return fileName;
    }

    return fileName + FileConstants.defaultFileType;
  }

  // Would really love to do better here, but we're blocked by an issue in
  // Typescript with types at runtime.
  // https://stackoverflow.com/questions/38688822/how-to-parse-json-string-in-typescript
  private static getFileParser(fileName: string): (serialized: string) => unknown {
    if (FileStorageService.isYamlFile(fileName)) {
      return yaml.parse;
    }
    if (FileStorageService.isJsonFile(fileName)) {
      return JSON.parse;
    }

    return (content: string) => content;
  }

  private static getFileStringifier(fileName: string): (object: unknown) => string {
    if (FileStorageService.isYamlFile(fileName)) {
      return yaml.stringify;
    }

    if (FileStorageService.isEnvFile(fileName)) {
      return (object) => {
        return object as string;
      };
    }

    return JSON.stringify;
  }

  private static isYamlFile = (fileName: string) => fileName.endsWith(".yml") || fileName.endsWith(".yaml");
  private static isJsonFile = (fileName: string) => fileName.endsWith(".json");
  private static isEnvFile = (fileName: string) => fileName.endsWith(".env");
}
