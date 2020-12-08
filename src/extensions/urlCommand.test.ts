import { Link } from "../models";
import { CliSimulator, ServiceSimulator } from "../test";
import { urlCommand } from "./urlCommand";
jest.mock("open");
import open from "open";

describe("URL Command", () => {
  it("creates a URL command with base path", async () => {
    // Setup
    const link: Link = {
      name: "link",
      description: "my link",
      url: "https://github.com",
    };

    const serviceCollection = ServiceSimulator.createTestServiceCollection();

    // Act
    await urlCommand(link, undefined, serviceCollection).parseAsync(CliSimulator.createArgs());

    // Assert
    expect(open).toBeCalledWith(link.url);
  });

  it("creates a URL command with additional path", async () => {
    // Setup
    const link: Link = {
      name: "link",
      description: "my link",
      url: "https://github.com",
    };
    const urlPath = "/projector-cli";

    const serviceCollection = ServiceSimulator.createTestServiceCollection();

    // Act
    await urlCommand(link, urlPath, serviceCollection).parseAsync(CliSimulator.createArgs());

    // Assert
    expect(open).toBeCalledWith(`${link.url}${urlPath}`);
  });
});
