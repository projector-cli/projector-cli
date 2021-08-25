const envVarValue1 = "env var 1";
process.env.TEST_CONFIG_ENV_VAR_1 = envVarValue1;

import { registerProviders } from "../initialization";
import { CliSimulator, ServiceSimulator } from "../test";
import { Command } from "./command";

jest.mock("figlet");
import figlet from "figlet";

describe("Command", () => {
  const commandName1 = "command1";
  const commandName2 = "command2";

  const commandDescription1 = "commandDescription1";
  const commandDescription2 = "commandDescription2";

  const command1 = new Command().name(commandName1).description(commandDescription1);
  const command2 = new Command().name(commandName2).description(commandDescription2);

  command1.addSubCommand(command2);

  it("calls initialize action", () => {
    // Setup
    const initializeAction = jest.fn();

    // Act
    new Command().initialize(initializeAction).parse(["node.exe", "index.js", "commandName"]);

    // Assert
    expect(initializeAction).toBeCalled();
  });

  it("executes multiple actions", async () => {
    // Setup
    const action1 = jest.fn();
    const action2 = jest.fn();
    const action3 = jest.fn();
    const serviceCollection = ServiceSimulator.createTestServiceCollection();

    await new Command()
      .setServiceCollection(serviceCollection)
      .addAction(action1)
      .addAction(action2)
      .addAction(action3)
      .parseAsync(CliSimulator.createArgs());

    expect(action1).toBeCalled();
    expect(action2).toBeCalled();
    expect(action3).toBeCalled();
  });

  it("executes multiple actions with options", async () => {
    // Setup
    const action1 = jest.fn();
    const action2 = jest.fn();
    const action3 = jest.fn();
    const optionValue = "optionValue";
    const serviceCollection = ServiceSimulator.createTestServiceCollection();

    // Act
    await new Command()
      .option("-m, --my-option <my-option>", "My option")
      .setServiceCollection(serviceCollection)
      .addAction(action1)
      .addAction(action2)
      .addAction(action3)
      .parseAsync(
        CliSimulator.createArgs([
          {
            name: "--my-option",
            value: optionValue,
          },
        ]),
      );

    // Assert
    const expectedParsedOptions = {
      myOption: optionValue,
    };

    expect(action1).toBeCalledWith(expect.anything(), expectedParsedOptions);
    expect(action2).toBeCalledWith(expect.anything(), expectedParsedOptions);
    expect(action3).toBeCalledWith(expect.anything(), expectedParsedOptions);
  });

  it("prints help information", async () => {
    const serviceCollection = ServiceSimulator.createTestServiceCollection();
    const { logger } = serviceCollection;
    logger.log = jest.fn();

    // Act
    await new Command()
      .initialize(() => registerProviders())
      .setServiceCollection(serviceCollection)
      .printHelp()
      .parseAsync(["node.exe", "index.js", "commandName"]);

    // Assert
    expect(logger.log).toHaveBeenCalledTimes(1);
  });

  it("prints ascii art", async () => {
    const serviceCollection = ServiceSimulator.createTestServiceCollection();

    // Setup
    const originalText = "text";
    const figletText = "figlet text";
    figlet.textSync = jest.fn(() => figletText);

    // Act
    await new Command()
      .initialize(() => registerProviders())
      .setServiceCollection(serviceCollection)
      .asciiArt(originalText)
      .parseAsync(["node.exe", "index.js", "commandName"]);

    // Assert
    expect(figlet.textSync).toBeCalledWith(originalText);
  });

  it("gets the markdown representation of the command", () => {
    const commandHelp1 = command1.helpInformation();
    const commandHelp2 = command2.helpInformation();

    const markdown = command1.toMarkdownDoc();
    expect(markdown).toContain(commandHelp1);
    expect(markdown).toContain(commandHelp2);
    expect(markdown).toContain(commandDescription1);
    expect(markdown).toContain(commandDescription2);
  });

  it("gets the table of contents for the command", () => {
    const toc = command1.toTableOfContents();
    expect(toc).toContain(commandName1);
    expect(toc).toContain(commandName2);
    expect(toc).toContain(commandDescription1);
    expect(toc).toContain(commandDescription2);
  });

  it("gets a command name", () => {
    const name = "myCommandName";
    const command = new Command().name(name);
    expect(command.getName()).toEqual(name);
  });

  it("gets a parent command", () => {
    const parentName = "myParentCommand";
    const parent = new Command().name(parentName);

    const childName = "myChildCommand";
    const child = new Command().name(childName).setParent(parent);

    expect(child.getParent()?.getName()).toEqual(parentName);
    expect(parent.getParent()).toBeUndefined();
  });

  it("gets command path", () => {
    const parentName = "myParentCommand";
    const parent = new Command().name(parentName);

    const childName = "myChildCommand";
    const child = new Command().name(childName).setParent(parent);

    expect(child.getCommandPath()).toEqual(`${parentName}/${childName}`);
    expect(parent.getCommandPath()).toEqual(parentName);
  });

  it("adds sub command and creates child relationship", () => {
    const parentName = "myParentCommand";
    const parent = new Command().name(parentName);

    const childName = "myChildCommand";
    const child = new Command().name(childName);

    parent.addSubCommand(child);
    expect(child.getParent()?.getName()).toEqual(parentName);
  });

  describe("optionInteractive", () => {
    it("gets value provided as CLI option", async () => {
      const userValue = "this is my name";
      const actionFn = jest.fn();

      const command = new Command<{ myName: string }>()
        .optionInteractive({
          shortName: "-n",
          longName: "--my-name",
        })
        .addAction((serviceCollection, options) => {
          const { myName } = options;
          actionFn(myName);
        });

      await command.parseAsync(
        CliSimulator.createArgs([
          {
            name: "--my-name",
            value: userValue,
          },
        ]),
      );

      expect(actionFn).toBeCalledWith(userValue);
    });

    it("gets a value from the user", async () => {
      const userValue = "this is my name";
      const actionFn = jest.fn();
      const inputService = ServiceSimulator.createTestInputService({
        answer: userValue,
      });
      const serviceCollection = ServiceSimulator.createTestServiceCollection({ inputService });

      const command = new Command<{ myName: string }>()
        .setServiceCollection(serviceCollection)
        .optionInteractive({
          shortName: "-n",
          longName: "--my-name",
        })
        .addAction((serviceCollection, options) => {
          const { myName } = options;
          actionFn(myName);
        });

      await command.parseAsync(
        CliSimulator.createArgs([
          {
            name: "--my-name",
            value: userValue,
          },
        ]),
      );
      // Asserts that action was actually called
      // Action contains the assertion
      expect(actionFn).toBeCalledWith(userValue);
    });

    it("gets a multiple choice value from user", async () => {
      const userValue = "optionA";
      const actionFn = jest.fn();
      const inputService = ServiceSimulator.createTestInputService({
        multiChoiceAnswer: userValue,
      });
      const serviceCollection = ServiceSimulator.createTestServiceCollection({ inputService });

      const command = new Command<{ myName: string }>()
        .setServiceCollection(serviceCollection)
        .optionInteractive({
          shortName: "-n",
          longName: "--my-name",
          choices: ["optionA", "optionB", "optionC"],
        })
        .addAction((serviceCollection, options) => {
          const { myName } = options;
          actionFn(myName);
        });
      await command.parseAsync(CliSimulator.createArgs());
      // Asserts that action was actually called
      // Action contains the assertion
      expect(actionFn).toBeCalledWith(userValue);
    });

    it("uses dynamic choice initialization", async () => {
      const userValue = "optionA";
      const actionFn = jest.fn();
      const dynamicOptions = ["optionA", "optionB", "optionC"];
      const prompt = "this is my prompt";

      const inputService = ServiceSimulator.createTestInputService({
        multiChoiceAnswer: userValue,
      });

      const serviceCollection = ServiceSimulator.createTestServiceCollection({
        inputService,
      });

      const command = new Command<{ myName: string }>()
        .setServiceCollection(serviceCollection)
        .optionInteractive({
          shortName: "-n",
          longName: "--my-name",
          prompt,
          choices: dynamicOptions,
        })
        .addAction((_serviceCollection, options) => {
          const { myName } = options;
          actionFn(myName);
        });

      await command.parseAsync(CliSimulator.createArgs());

      expect(inputService.multiChoiceQuestion).toBeCalledWith(prompt, dynamicOptions);
      expect(actionFn).toBeCalledWith(userValue);
    });
  });
});
