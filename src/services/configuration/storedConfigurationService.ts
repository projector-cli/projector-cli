import { ConfigurationService } from "./configurationService";
import { Configuration, Logger, OnlyRequire, PlaybookConfiguration, ProjectConfiguration } from "../../models";
import { StorageService } from "../storage";
import { FileConstants } from "../../constants";

/**
 * Class to interact with the configuration for Projector.
 *
 * Stores the known and selected playbooks and projects, and exposes functionality to update them.
 */
export class StoredConfigurationService implements ConfigurationService {
  private readonly storageService: StorageService<Configuration>;
  private readonly logger: Logger;

  constructor(storageService: StorageService<Configuration>, logger: Logger) {
    this.storageService = storageService;
    this.logger = logger;
  }

  /**
   * ==========================================================================
   *                                 PLAYBOOKS
   * ==========================================================================
   */
  //#region

  /**
   * Gets the configured playbooks.
   *
   * @returns {PlaybookConfiguration[]} The list of configured playbooks.
   */
  public async getPlaybooks(): Promise<PlaybookConfiguration[]> {
    const configuration = await this.getOrCreateConfiguration();
    return configuration.playbooks;
  }

  /**
   * Adds a playbook to the configuraiton.
   *
   * @param {PlaybookConfiguration} options The configuration of the playbook to add.
   */
  public async addPlaybook(options: PlaybookConfiguration): Promise<void> {
    const configuration = await this.getOrCreateConfiguration();
    const matches = configuration.playbooks.filter((playbook) => playbook.name === options.name);
    if (matches.length === 1) {
      this.logger.warn(
        `Tried to add new playbook ${options}\nBut playbook ${matches[0].name} already exists: ${matches[0]}`,
      );
    } else if (matches.length > 1) {
      this.logger.warn(
        `Something's wrong with your config file:\nTried to add new playbook ${options}\nBut playbooks ${matches
          .map((match) => match.name)
          .join()} already exist: ${matches}`,
      );
    } else {
      const playbook: PlaybookConfiguration = {
        templatesPath: FileConstants.templatesPath,
        ...options,
      };

      configuration.playbooks.push(playbook);

      await this.storageService.write(FileConstants.configFileName, configuration);
    }
  }

  /**
   * Removes a playbook from the configuration.
   *
   * @param {string} name The name of the playbook to remove.
   */
  public async removePlaybook(name: string): Promise<void> {
    const configuration = await this.getOrCreateConfiguration();
    const matches: PlaybookConfiguration[] = [];
    const others: PlaybookConfiguration[] = [];
    configuration.playbooks.forEach((playbook) =>
      playbook.name === name ? matches.push(playbook) : others.push(playbook),
    );

    if (matches.length !== 0) {
      configuration.playbooks = others;

      await this.storageService.write(FileConstants.configFileName, configuration);
    }
  }

  /**
   * Selects a playbook to target with future commands.
   *
   * @param {string} name The playbook to select.
   */
  public async selectPlaybook(name: string): Promise<void> {
    const configuration = await this.getOrCreateConfiguration();
    const playbook = configuration.playbooks.find((playbook) => playbook.name === name);
    if (!playbook) {
      this.logger.warn(`Couldn't find playbook ${name}.`);
      return;
    }
    if (playbook.isActive) {
      this.logger.log(`Playbook ${name} is already active.`);
      return;
    }

    await this.updatePlaybook({ name, isActive: true });
  }

  /**
   * Deselects a playbook to target with future commands.
   *
   * @param {string} name The playbook to deselect.
   */
  public async deselectPlaybook(name: string): Promise<void> {
    const configuration = await this.getOrCreateConfiguration();
    const playbook = configuration.playbooks.find((playbook) => playbook.name === name);
    if (!playbook) {
      this.logger.warn(`Couldn't find playbook ${name}.`);
      return;
    }
    if (!playbook.isActive) {
      this.logger.log(`Playbook ${name} is already inactive.`);
      return;
    }

    await this.updatePlaybook({ name, isActive: false });
  }

  /**
   * Updates the properties on a playbook.
   *
   * @param {OnlyRequire<PlaybookConfiguration, "name">} options The options to update the playbook with.
   * Besides name, all arguments are optional.
   */
  public async updatePlaybook(options: OnlyRequire<PlaybookConfiguration, "name">): Promise<void> {
    const configuration = await this.getOrCreateConfiguration();
    const matches: PlaybookConfiguration[] = [];
    const others: PlaybookConfiguration[] = [];
    configuration.playbooks.forEach((playbook) =>
      playbook.name === options.name ? matches.push(playbook) : others.push(playbook),
    );

    if (matches.length === 1) {
      const match = matches[0];
      const mergedConfiguration: PlaybookConfiguration = { ...match, ...options };

      others.push(mergedConfiguration);

      configuration.playbooks = others;

      await this.storageService.write(FileConstants.configFileName, configuration);
      return;
    } else if (matches.length > 1) {
      this.logger.warn(
        `Something's wrong with your config file:\nTried to update playbook ${options}\nBut multiple playbooks ${matches
          .map((match) => match.name)
          .join()} found: ${matches}`,
      );
    } else {
      this.logger.warn(`No playbook named ${options.name} found.`);
    }
  }

  //#endregion

  /**
   * ==========================================================================
   *                                 PROJECTS
   * ==========================================================================
   */
  //#region

  /**
   * Gets the configured projects.
   *
   * @returns {ProjectConfiguration[]} The list of configured projects.
   */
  public async getProjects(): Promise<ProjectConfiguration[]> {
    const configuration = await this.getOrCreateConfiguration();
    return configuration.projects;
  }

  /**
   * Adds a project to the configuration.
   *
   * @param {ProjectConfiguration} options The options to configure the project with.
   */
  public async addProject(options: ProjectConfiguration): Promise<void> {
    const configuration = await this.getOrCreateConfiguration();
    const matches = configuration.projects.filter((project) => project.name === options.name);
    if (matches.length === 1) {
      this.logger.warn(
        `Tried to add new project ${options}\nBut project ${matches[0].name} already exists: ${matches[0]}`,
      );
    } else if (matches.length > 1) {
      this.logger.warn(
        `Something's wrong with your config file:\nTried to add new project ${options}\nBut projects ${matches
          .map((match) => match.name)
          .join()} already exist: ${matches}`,
      );
    } else {
      configuration.projects.push(options);

      await this.storageService.write(FileConstants.configFileName, configuration);
    }
  }

  /**
   * Removes a project from the configuration.
   *
   * @param {string} name The name of the project to remove.
   */
  public async removeProject(name: string): Promise<void> {
    const configuration = await this.getOrCreateConfiguration();
    const matches: ProjectConfiguration[] = [];
    const others: ProjectConfiguration[] = [];
    configuration.projects.forEach((project) => (project.name === name ? matches.push(project) : others.push(project)));

    if (matches.length !== 0) {
      configuration.projects = others;

      await this.storageService.write(FileConstants.configFileName, configuration);
    }
  }

  /**
   * Selects a project to target with future commands.
   *
   * @param {string} name The project to select.
   */
  public async selectProject(name: string): Promise<void> {
    const configuration = await this.getOrCreateConfiguration();
    const project = configuration.projects.find((project) => project.name === name);
    if (!project) {
      this.logger.warn(`Couldn't find project ${name}.`);
      return;
    }
    if (project.isActive) {
      this.logger.log(`Project ${name} is already active.`);
      return;
    }

    await this.updateProject({ name, isActive: true });
  }

  /**
   * Deselects a project to target with future commands.
   *
   * @param {string} name The project to deselect.
   */
  public async deselectProject(name: string): Promise<void> {
    const configuration = await this.storageService.read(FileConstants.configFileName);
    if (configuration) {
      const project = configuration.projects.find((project) => project.name === name);
      if (!project) {
        this.logger.warn(`Couldn't find project ${name}.`);
        return;
      }
      if (!project.isActive) {
        this.logger.log(`Project ${name} is already inactive.`);
        return;
      }

      await this.updateProject({ name, isActive: false });
    }
  }

  /**
   * Updates the properties on a project.
   *
   * @param {OnlyRequire<ProjectConfiguration, "name">} options The options to update the project with.
   * Besides name, all arguments are optional.
   */
  public async updateProject(options: OnlyRequire<ProjectConfiguration, "name">): Promise<void> {
    const configuration = await this.getOrCreateConfiguration();
    const matches: ProjectConfiguration[] = [];
    const others: ProjectConfiguration[] = [];
    configuration.projects.forEach((project) =>
      project.name === options.name ? matches.push(project) : others.push(project),
    );

    if (matches.length === 1) {
      const match = matches[0];
      const mergedConfiguration: ProjectConfiguration = { ...match, ...options };

      others.push(mergedConfiguration);

      configuration.projects = others;

      await this.storageService.write(FileConstants.configFileName, configuration);
      return;
    } else if (matches.length > 1) {
      this.logger.warn(
        `Something's wrong with your config file:\nTried to update project ${options}\nBut multiple projects ${matches
          .map((match) => match.name)
          .join()} found: ${matches}`,
      );
    } else {
      this.logger.warn(`No project named ${options.name} found.`);
    }
  }

  //#endregion

  /**
   * Gets the current configuration, or creates a new one if none is found.
   *
   * @returns {Configuration} A configuration.
   */
  private async getOrCreateConfiguration(): Promise<Configuration> {
    return (
      (await this.storageService.read(FileConstants.configFileName)) ?? {
        playbooks: [],
        projects: [],
        appInsights: {
          instrumentationKey: "6e4b4afa-05f9-4a1f-a5f8-a95958b53f60",
          enabled: true,
        },
      }
    );
  }
}
