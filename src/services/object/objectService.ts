import yaml from "yaml";
import { StorageService } from "../../models";

/**
 * A service following [the template pattern]{@link https://en.wikipedia.org/wiki/Template_method_pattern}
 * for object storage and retrieval.
 *
 * This decouples storage and interpolation from object retrieval, so commands
 * can delegate those responsibilities and focus on commanding.
 */
export class ObjectService<T> {
  private storageService: StorageService;

  /**
   * Creates an instance of an ObjectService.
   *
   * @param {StorageService} storageService The storage service to back the
   * ObjectService with.
   * @returns {ObjectService<T>} An ObjectService instance.
   * @class
   * @template T
   */
  public constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  /**
   * Gets an object by name, and optionally by location.
   *
   * @param {string} name The name of the object.
   * @param {string} location The location of the object. If null, some default
   * should be used.
   * @returns {Promise<T>} The object, if found.
   * @throws If the object cannot be read from that location.
   * @template T
   */
  public async get(name: string, location?: string): Promise<T> {
    const content = await this.read(name, location);
    if (!content) {
      throw new Error("Failed to read content.");
    }
    const interpolated = this.interpolate(content);

    return this.parse(interpolated, name);
  }

  /**
   * Gets an existing object by name, and optionally by location.
   *
   * @param {string} name The name of the object.
   * @param {string} location The location of the object. If null, some default
   * should be used.
   *
   * @returns {Promise<T>} The object, if found: Null otherwise.
   * @template T
   */
  public async getIfExists(name: string, location?: string): Promise<T | undefined> {
    const content = await this.read(name, location);
    if (!content) {
      return undefined;
    }
    const interpolated = this.interpolate(content);
    return this.parse(interpolated, name);
  }

  /**
   * Sets an object by name, and optionally by location.
   *
   * @param {string} name The name of the object to store.
   * @param {T} obj The instance of the object to store.
   * @param {string} location The place to store the object. If null, some
   * default should be used.
   *
   * @template T
   */
  public async set(name: string, obj: T, location?: string): Promise<void> {
    const content = typeof obj === "string" ? obj : this.stringify(obj, name);
    await this.write(name, content, location);
  }

  /**
   * Parses an object. The default implementation is backed by JSON.parse or yaml.parse
   * If this method is used with classes and not just DTOs, this method should be
   * overridden.
   *
   * @param {string} content The JSON object to parse.
   * @param {string} fileName The name of the file to parse
   * @returns {T} The parsed object.
   * @template T
   */
  public parse(content: string, fileName: string): T {
    // In some cases, content is already parsed
    if (typeof content !== "string") {
      return content;
    }

    /* eslint-disable prettier/prettier */
    const obj: T = this.isYamlFile(fileName)
      ? yaml.parse(content)
      : this.isJsonFile(fileName)
        ? JSON.parse(content)
        : content;
    /* eslint-enable prettier/prettier */
    if (!obj) {
      throw new Error(`Failed to parse ${content}.`);
    }
    return obj;
  }

  /**
   * List all files in a location
   *
   * @param {string} location Location to list files
   * @returns {Promise<string[]>} List of files
   */
  public list(location?: string): Promise<string[]> {
    return this.storageService.list(location);
  }

  /**
   * A protected method to find an object. If storage is tree-like, for example,
   * the definition of find might recursively search towards the root.
   *
   * @param {string} name The name of the object to find.
   * @param {string} startingLocation The location to start in storage. If null,
   * the search starts at the default location.
   *
   * @returns {Promise<string | undefined>} The object in JSON format if found:
   * Otherwise, undefined.
   */
  protected find(name: string, startingLocation?: string): Promise<string | undefined> {
    return this.storageService.find(name, startingLocation);
  }

  /**
   * A protected method to read an object.
   *
   * @param {string} name The name of the object to read.
   * @param {string} location The location to read in storage. If null, reads
   * from the default location.
   *
   * @returns {Promise<string | undefined>} The object in JSON format if an
   * object of that name exists in that location: Otherwise, undefined.
   */
  protected read(name: string, location?: string): Promise<string | undefined> {
    return this.storageService.read(name, location);
  }

  /**
   * A protected method to write an object.
   *
   * @param {string} name The name of the object to write.
   * @param {string} content The serialized object to write.
   * @param {string} location The location to write in storage. If null, writes
   * to the default location.
   *
   * @returns {Promise<boolean>} Whether the write was successful.
   */
  protected write(name: string, content: string, location?: string): Promise<boolean> {
    return this.storageService.write(name, content, location);
  }

  /**
   * A virtual method to interpolate variables into some provided content.
   *
   * @param {string} content Content with variables defined.
   *
   * @returns {string} The content with variables replaced.
   */
  protected interpolate(content: string): string {
    return content;
  }

  /**
   * Serializes a DTO.
   *
   * @param {T} content A DTO.
   * @param {string} fileName Name of file
   * @returns {string} The content turned into a JSON string.
   * @template T The type to stringify
   */
  protected stringify(content: T, fileName: string): string {
    return this.isYamlFile(fileName) ? yaml.stringify(content) : JSON.stringify(content, null, 4);
  }

  private isYamlFile(fileName: string): boolean {
    return fileName.endsWith(".yml") || fileName.endsWith(".yaml");
  }

  private isJsonFile(fileName: string): boolean {
    return fileName.endsWith(".json");
  }
}
