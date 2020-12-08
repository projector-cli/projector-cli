import { StorageService } from "../../models/storage";
import { mkdir, readFile, realpath, writeFile, readdir } from "fs/promises";
import { sep, join } from "path";
import { Logger } from "../../models";
import { BaseEncodingOptions } from "fs";

export class FileStorageService implements StorageService {
  private static encoding: BufferEncoding = "utf-8";
  private static readWriteOptions: BaseEncodingOptions = { encoding: FileStorageService.encoding };
  private defaultWriteLocation: string;
  private logger: Logger;

  constructor(defaultWriteLocation: string, logger: Logger) {
    this.defaultWriteLocation = defaultWriteLocation;
    this.logger = logger;
  }

  public async find(fileName: string, startingDirectory?: string): Promise<string | undefined> {
    const path = startingDirectory ?? this.defaultWriteLocation;

    const filePath = await this.read(fileName, path);
    if (filePath) {
      return filePath;
    }

    for (
      let parentDirectory = path;
      parentDirectory !== startingDirectory || parentDirectory !== sep;
      parentDirectory = join(parentDirectory, "..")
    ) {
      try {
        const directory = await realpath(parentDirectory);

        return this.find(fileName, directory);
      } catch (e) {
        if (e.code !== "ENOENT") {
          throw e;
        }
        /** otherwise, that didn't exist, so just swallow it */
      }
    }

    return undefined;
  }

  public async read(fileName: string, directory?: string): Promise<string | undefined> {
    try {
      const path = directory ?? this.defaultWriteLocation;
      const filePath = join(path, fileName);

      const content = await readFile(filePath, FileStorageService.readWriteOptions);

      if (typeof content === "string") {
        return content;
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

  public async write(fileName: string, content: string, directory?: string): Promise<boolean> {
    const path = directory ?? this.defaultWriteLocation;
    await mkdir(path, { recursive: true });
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
}
