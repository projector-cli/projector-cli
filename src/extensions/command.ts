/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from "chalk";
import { Command as CommanderCommand } from "commander";
import figlet from "figlet";
import { FileConstants, MetricNames } from "../constants";
import { ServiceCollectionFactory } from "../factories";
import {
  ActionHandler,
  AgileProviderOptions,
  OptionInteractive,
  Properties,
  RepoProviderOptions,
  ServiceCollection,
} from "../models";
import {
  agileAccessTokenInteractiveOption,
  agileBaseUrlInteractiveOption,
  agileProjectNameInteractiveOption,
  agileProviderInteractiveOption,
  playbookOptionalAccessTokenInteractiveOption,
  repoAccessTokenInteractiveOption,
  repoBaseUrlInteractiveOption,
  repoProjectNameInteractiveOption,
  repoProviderInteractiveOption,
} from "../options";
import { AgileServiceProvider, RepoServiceProvider } from "../services";
import { Config } from "../utils";

/**
 * Command extension class
 */
export class Command<TOptions = any> extends CommanderCommand {
  private actions: ActionHandler<TOptions>[];
  private commandOptions: TOptions;
  private serviceCollection?: ServiceCollection;
  private parentCommand?: Command;

  constructor() {
    super();
    this.actions = [];
    this.commandOptions = {} as TOptions;
  }

  public initialize(initializeAction: () => void): Command<TOptions> {
    initializeAction();
    return this;
  }

  public optionInteractive(optionConfig: OptionInteractive): Command<TOptions> {
    const {
      shortName,
      longName,
      description,
      defaultValue,
      configKey,
      agileServiceProviders,
      repoServiceProviders,
      prompt,
      choices,
    } = optionConfig;

    const variableName = this.getVariableName(longName);

    const decoratedDescription = description + this.getDecoratedDescription(optionConfig);

    this.option(`${shortName}, ${longName} <${variableName}>`, decoratedDescription);

    // Add action for getting option value
    return this.addAction(async (serviceCollection: ServiceCollection) => {
      const { inputService } = serviceCollection;
      const currentValue = this.opts()[variableName];
      // If defined, means they've passed in an argument
      if (currentValue !== undefined) {
        (this.commandOptions as any)[variableName] = currentValue;
        return;
      }

      if (configKey) {
        // Try to get value from configuration - return if exists
        const configuredVal = Config.getValueWithDefault(configKey);
        if (configuredVal) {
          (this.commandOptions as any)[variableName] = configuredVal;
          return;
        }
      }

      const agileServiceProvider = this.getAgileProvider();
      const repoServiceProvider = this.getRepoProvider();

      // Check that current agile provider is included in list of option service providers
      if (agileServiceProviders && agileServiceProvider && !agileServiceProviders.includes(agileServiceProvider)) {
        return;
      }

      // Check that current repo provider is included in list of option service providers
      if (repoServiceProviders && repoServiceProvider && !repoServiceProviders.includes(repoServiceProvider)) {
        return;
      }

      const questionPrompt = prompt || `Enter a value for ${longName}:`;

      const optionChoices = typeof choices === "function" ? await choices(serviceCollection) : choices;

      // Ask user for value - use multiple choice if applicable
      const answeredVal = optionChoices
        ? await inputService.multiChoiceQuestion(questionPrompt, optionChoices)
        : await inputService.askQuestion(questionPrompt, defaultValue);

      if (!answeredVal?.trim().length) {
        return;
      }

      (this.commandOptions as any)[variableName] = answeredVal;

      // Ask user if they'd like to save to .env if configKey exists to save it
      if (configKey && (await inputService.confirmAction("Would you like to save to your local environment file?"))) {
        const { contentService, logger } = serviceCollection;
        const currentEnvFile = await contentService.getIfExists(FileConstants.envFileName);

        const updatedEnvFile = Config.getUpdatedEnvFileContents(configKey, answeredVal, currentEnvFile);
        await contentService.set(FileConstants.envFileName, updatedEnvFile);
        logger.log(`Saved to ${FileConstants.envFileName}`);
      }
    });
  }

  /**
   * Gets the name of the command
   *
   * @returns {string} Name of individual command (not full command path)
   */
  public getName(): string {
    return this._name;
  }

  /**
   * Sets parent command
   *
   * @param {Command} parentCommand Parent command
   * @returns {Command} this
   */
  public setParent(parentCommand: Command): Command {
    this.parentCommand = parentCommand;
    return this;
  }

  /**
   * Gets the parent command
   *
   * @returns {Command} Parent command
   */
  public getParent(): Command | undefined {
    return this.parentCommand;
  }

  /**
   * Gets command path, delimited by '/'
   *
   * @returns {string} Full command path name (e.g. grandparent/parent/child)
   */
  public getCommandPath(): string {
    const getCommandPath = (command: Command): string => {
      const parent = command.getParent();
      if (!parent) {
        return command.getName();
      }
      return `${getCommandPath(parent)}/${command.getName()}`;
    };

    return getCommandPath(this);
  }

  /**
   * Adds a sub command and sets this as parent command
   *
   * @param {Command} subCommand Sub command to add
   * @returns {Command} this
   */
  public addSubCommand(subCommand: Command): Command {
    this.addCommand(subCommand);
    subCommand.setParent(this);
    return this;
  }

  private getDecoratedDescription(optionConfig: OptionInteractive): string {
    const { description, configKey, agileServiceProviders, repoServiceProviders, choices } = optionConfig;

    return (
      description +
      (configKey ? `\nCan be provided via environment variable ${Config.getEnvironmentVariableName(configKey)}` : "") +
      "\nCan be provided interactively by user if not available" +
      (choices && typeof choices !== "function" ? `\nOptions: (${choices.join(", ")})` : "") +
      (agileServiceProviders ? `\nOnly valid for agile providers: (${agileServiceProviders.join(", ")})` : "") +
      (repoServiceProviders ? `\nOnly valid for repo providers: (${repoServiceProviders.join(", ")})` : "")
    );
  }

  private getAgileProvider(): AgileServiceProvider {
    return ((this.commandOptions as any) as AgileProviderOptions).agileProvider;
  }

  private getRepoProvider(): RepoServiceProvider {
    return ((this.commandOptions as any) as RepoProviderOptions).repoProvider;
  }

  /**
   * Gets a variable name from a long option name
   *
   * @param {string} longName Long variable name `--my-variable-name`
   * @returns {string} camelCasedVariableName (e.g. myVariableName)
   */
  private getVariableName(longName: string): string {
    const longNameSplit = longName.replace(/^--/, "").split("-");

    if (longNameSplit.length === 1) {
      return longNameSplit[0];
    }

    const capitalizeFirstLetter = (word: string): string => {
      const firstChar = word.charAt(0);
      return word.replace(firstChar, firstChar.toUpperCase());
    };

    return longNameSplit.map((value, index) => (index > 0 ? capitalizeFirstLetter(value) : value)).join("");
  }

  public addAgileProviderOptions(): Command<TOptions> {
    return this.optionInteractive(agileProviderInteractiveOption)
      .optionInteractive(agileBaseUrlInteractiveOption)
      .optionInteractive(agileAccessTokenInteractiveOption)
      .optionInteractive(agileProjectNameInteractiveOption);
  }

  public addRepoProviderOptions(): Command<TOptions> {
    return this.optionInteractive(repoProviderInteractiveOption)
      .optionInteractive(repoBaseUrlInteractiveOption)
      .optionInteractive(repoAccessTokenInteractiveOption)
      .optionInteractive(repoProjectNameInteractiveOption);
  }

  public addPlaybookOptions(): Command<TOptions> {
    return this.optionInteractive(playbookOptionalAccessTokenInteractiveOption);
  }

  public addAction(actionHandler: ActionHandler<TOptions>): Command<TOptions> {
    this.actions.push(actionHandler);

    this.action(async () => {
      const serviceCollection = this.serviceCollection || ServiceCollectionFactory.create();

      this.commandOptions = {
        ...this.opts(),
        ...this.commandOptions,
      };

      const commandProperties: Properties = {
        command: this.getCommandPath(),
      };

      // Add command path to default properties for observability
      serviceCollection.logger.addDefaultProperties(commandProperties);
      serviceCollection.metrics?.addDefaultProperties(commandProperties);

      serviceCollection.metrics?.increment(MetricNames.CommandExecution);

      for (const action of this.actions) {
        await action(serviceCollection, this.commandOptions);
      }

      // Flush all metrics to app insights
      serviceCollection.metrics?.flush();
    });
    return this;
  }

  public printHelp(): Command<TOptions> {
    this.addAction((serviceCollection: ServiceCollection) => {
      serviceCollection.logger.log(this.helpInformation());
    });
    return this;
  }

  public asciiArt(message: string): Command<TOptions> {
    this.addAction((serviceCollection: ServiceCollection) => {
      serviceCollection.logger.log(chalk.cyanBright(figlet.textSync(message)));
    });
    return this;
  }

  public addPhoneTree(): Command<TOptions> {
    this.addAction(async (serviceCollection: ServiceCollection) => {
      const { inputService } = serviceCollection;
      const subCommandNames = this.commands.map((command) => `${command.name()} - ${command.description()}`);
      const subCommandNameChosen = (await inputService.multiChoiceQuestion(this.name(), subCommandNames)).split(
        " - ",
      )[0];
      const subCommandChosen = this.commands.find((command) => command.name() === subCommandNameChosen);
      if (subCommandChosen) {
        await subCommandChosen.parseAsync(this.args);
      }
    });
    return this;
  }

  public toMarkdownDoc(parentCommandPath?: string): string {
    const commandPath = `${parentCommandPath ? parentCommandPath + " " : ""}${this.name()}`;
    let doc = `## \`${commandPath}\`\n\n`;
    doc += "```\n" + this.helpInformation() + "```";

    for (const command of this.commands) {
      if (command instanceof Command) {
        doc += `\n${command.toMarkdownDoc(commandPath)}`;
      }
    }
    return doc;
  }

  public toTableOfContents(linkPrefix?: string, parentIndentation?: string, parentCommandPath?: string): string {
    const indentation = parentIndentation !== undefined ? parentIndentation + "  " : "";
    const commandPath = `${parentCommandPath ? parentCommandPath + " " : ""}${this.name()}`;
    const line =
      "- [`" +
      commandPath +
      "`]" +
      `(${linkPrefix ? linkPrefix : ""}#${commandPath.replace(/ /g, "-")}) - ${this.description()}`;
    let toc = indentation + line;
    for (const command of this.commands) {
      if (command instanceof Command) {
        toc += `\n${command.toTableOfContents(linkPrefix, indentation, commandPath)}`;
      }
    }
    return toc;
  }

  public setServiceCollection(serviceCollection?: ServiceCollection): Command {
    if (serviceCollection) {
      this.serviceCollection = serviceCollection;
    }
    return this;
  }
}
