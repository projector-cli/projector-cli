import mockFs from "mock-fs";
import { ServiceSimulator } from "../../test";
import { FileStorageService } from "./fileStorageService";

describe("File Storage Service", () => {
  const root = "root";
  const logger = ServiceSimulator.createTestLogger();
  const fileStorageService = new FileStorageService(root, logger);

  // eslint-disable-next-line
  const expected = "{name: \"jack\"}";

  beforeAll(() => {
    mockFs(
      {
        root: {
          "file.json": expected,
        },
      },
      { createCwd: true, createTmp: true },
    );
  });

  afterAll(() => {
    mockFs.restore();
  });

  it("reads a file", async () => {
    // Act
    const json = await fileStorageService.read("file.json", root);

    // Assert
    expect(json).toEqual(expected);
  });

  it("writes a file", async () => {
    // Setup
    const newFile = "new.json";
    const newContent = JSON.stringify({ name: "zach" });

    // Act
    const wrote = await fileStorageService.write(newFile, newContent);

    // Assert
    expect(wrote).toBe(true);
  });

  it("finds a file", async () => {
    const file = "file.json";

    const found = await fileStorageService.find(file, "root/path/to/the/file/but/it/is/really/long");

    expect(found).toEqual(expected);
  });
});
