import { ObjectService } from "./objectService";
import { ServiceSimulator } from "../../test";
import yaml from "yaml";

describe("Object Service", () => {
  interface TestInterface {
    id: string;
    items: { name: string }[];
    subObject?: TestInterface;
  }

  const testObject: TestInterface = {
    id: "12345",
    items: [
      {
        name: "Item 1",
      },
      {
        name: "Item 2",
      },
    ],
    subObject: {
      id: "23456",
      items: [
        {
          name: "Item 3",
        },
        {
          name: "Item 4",
        },
      ],
    },
  };

  /**
   * Instantiate a new object service with the mocked content
   *
   * @param {string|undefined} readContent content to return when `.read` is called
   * @param {Function} writeFunction function to use in place of `.write`
   * @returns {ObjectService} New object service
   */
  function getObjectService(readContent?: string, writeFunction?: jest.Mock): ObjectService<TestInterface> {
    const storageService = ServiceSimulator.createTestStorageService(readContent, writeFunction);
    return new ObjectService<TestInterface>(storageService);
  }

  describe("JSON", () => {
    it("gets JSON content", async () => {
      const objectService = getObjectService(JSON.stringify(testObject));
      const obj = await objectService.get("file.json");
      expect(obj).toEqual(testObject);
    });

    it("get if exists returns object", async () => {
      const objectService = getObjectService(JSON.stringify(testObject));
      const obj = await objectService.getIfExists("file.json");
      expect(obj).toEqual(testObject);
    });

    it("get if exists returns undefined", async () => {
      const objectService = getObjectService(undefined);
      const obj = await objectService.getIfExists("file.json");
      expect(obj).toBeUndefined();
    });

    it("sets JSON content", async () => {
      const writeFunction = jest.fn();
      const objectService = getObjectService("", writeFunction);
      const expectedWriteContent = JSON.stringify(testObject, null, 4);
      await objectService.set("file.json", testObject);
      expect(writeFunction).toBeCalledWith("file.json", expectedWriteContent, undefined);
    });
  });

  describe("YAML", () => {
    it("gets YAML content", async () => {
      const objectService = getObjectService(yaml.stringify(testObject));
      const obj = await objectService.get("file.yml");
      expect(obj).toEqual(testObject);
    });

    it("get if exists returns object", async () => {
      const objectService = getObjectService(yaml.stringify(testObject));
      const obj = await objectService.getIfExists("file.yml");
      expect(obj).toEqual(testObject);
    });

    it("get if exists returns undefined", async () => {
      const objectService = getObjectService(undefined);
      const obj = await objectService.getIfExists("file.yml");
      expect(obj).toBeUndefined();
    });

    it("fails to get JSON content if invalid file name", async () => {
      const objectService = getObjectService(yaml.stringify(testObject));
      await expect(objectService.get("file.json")).rejects.toThrow();
    });

    it("sets YAML content", async () => {
      const writeFunction = jest.fn();
      const objectService = getObjectService("", writeFunction);
      const expectedWriteContent = yaml.stringify(testObject);
      await objectService.set("file.yml", testObject);
      expect(writeFunction).toBeCalledWith("file.yml", expectedWriteContent, undefined);
    });
  });
});
