import { StoredConfigurationService } from "./storedConfigurationService";
import { Configuration, PlaybookConfiguration, ProjectConfiguration } from "../../models";
import { ModelSimulator, ServiceSimulator } from "../../test";
import { StorageService } from "../storage";

describe("File Configuration Service", () => {
  let configuration: Configuration;
  let storageService: StorageService<Configuration>;
  const logger = ServiceSimulator.createTestLogger();

  const newPlaybook: PlaybookConfiguration = {
    name: "new playbook",
    location: "/my/local/playbook",
    templatesPath: "/my/local/playbook/templates",
  };

  const existingPlaybook: PlaybookConfiguration = {
    name: "existing playbook",
    location: new URL("https://www.github.com/projector-cli/projector-cli"),
    token: "projector token",
  };

  const newProject: ProjectConfiguration = {
    name: "new playbook",
    url: new URL("https://dev.azure.com"),
  };

  const existingProject: ProjectConfiguration = {
    name: "existing playbook",
    url: new URL("https://www.github.com/projector-cli/projector-cli"),
    token: "projector token",
  };

  beforeEach(() => {
    configuration = ModelSimulator.createConfiguration();
  });

  /**
   * ==========================================================================
   *                                 PLAYBOOKS
   * ==========================================================================
   */
  //#region

  // get playbooks

  it("gets playbooks w/ existing configuration", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    const playbooks = await configurationService.getPlaybooks();

    // Assert
    expect(playbooks).toBeTruthy();
    expect(storageService.read).toBeCalled();
  });

  it("gets playbooks w/out existing configuration", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    const playbooks = await configurationService.getPlaybooks();

    // Assert
    expect(playbooks).toBeTruthy();
    expect(storageService.read).toBeCalled();
  });

  // add playbook

  it("adds a playbook w/out existing configuration", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>();
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.addPlaybook(newPlaybook);

    // Assert
    expect(storageService.write).toBeCalled();
  });

  it("adds a playbook w/ existing configuration but no playbooks", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.addPlaybook(newPlaybook);

    // Assert
    expect(storageService.write).toBeCalled();
  });

  it("adds a playbook w/ existing configuration and existing playbooks", async () => {
    // Setup
    configuration.playbooks.push(existingPlaybook);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.addPlaybook(newPlaybook);

    // Assert
    expect(storageService.write).toBeCalled();
  });

  it("does not add a playbook w/ existing configuration and a matching playbook", async () => {
    // Setup
    configuration.playbooks.push(existingPlaybook);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.addPlaybook(existingPlaybook);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not add a playbook w/ existing configuration multiple matching playbooks", async () => {
    // Setup
    configuration.playbooks.push(existingPlaybook);
    configuration.playbooks.push(existingPlaybook);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.addPlaybook(existingPlaybook);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  // remove playbook

  it("does not remove a playbook w/out existing configuration", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>();
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.removePlaybook(newPlaybook.name);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not remove a playbook w/ existing configuration but no playbooks", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.removePlaybook(newPlaybook.name);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not remove a playbook w/ existing configuration but no matching playbook", async () => {
    // Setup
    configuration.playbooks.push(existingPlaybook);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.removePlaybook(newPlaybook.name);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("removes a playbook w/ existing configuration and a matching playbook", async () => {
    // Setup
    configuration.playbooks.push(existingPlaybook);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.removePlaybook(existingPlaybook.name);

    // Assert
    expect(storageService.write).toBeCalled();
  });

  // selects a playbook

  it("does not select a playbook w/out existing configuration", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>();
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.selectPlaybook(newPlaybook.name);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not select a playbook w/ existing configuration but no playbooks", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.selectPlaybook(newPlaybook.name);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not select a playbook w/ existing configuration but no matching playbook", async () => {
    // Setup
    configuration.playbooks.push(existingPlaybook);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.selectPlaybook(newPlaybook.name);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("selects a playbook w/ existing configuration and a matching playbook", async () => {
    // Setup
    configuration.playbooks.push({ ...existingPlaybook, isActive: false });
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.selectPlaybook(existingPlaybook.name);

    // Assert
    expect(storageService.write).toBeCalled();
  });

  // deselects a playbook

  it("does not deselect a playbook w/out existing configuration", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>();
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.deselectPlaybook(newPlaybook.name);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not deselect a playbook w/ existing configuration but no playbooks", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.deselectPlaybook(newPlaybook.name);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not deselect a playbook w/ existing configuration but no matching playbook", async () => {
    // Setup
    configuration.playbooks.push(existingPlaybook);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.deselectPlaybook(newPlaybook.name);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("deselects a playbook w/ existing configuration and a matching playbook", async () => {
    // Setup
    configuration.playbooks.push({ ...existingPlaybook, isActive: true });
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.deselectPlaybook(existingPlaybook.name);

    // Assert
    expect(storageService.write).toBeCalled();
  });

  // update playbook

  it("does not update a playbook w/out existing configuration", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>();
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.updatePlaybook(existingPlaybook);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not update a playbook w/ existing configuration but no playbooks", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.updatePlaybook(existingPlaybook);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not update a playbook w/ existing configuration but no matching playbooks", async () => {
    // Setup
    configuration.playbooks.push(existingPlaybook);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.updatePlaybook(newPlaybook);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not update a playbook w/ existing configuration multiple matching playbooks", async () => {
    // Setup
    configuration.playbooks.push(existingPlaybook);
    configuration.playbooks.push(existingPlaybook);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.updatePlaybook(existingPlaybook);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("updates a playbook w/ existing configuration and a matching playbook", async () => {
    // Setup
    configuration.playbooks.push(existingPlaybook);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);
    const updatedPlaybook = { ...existingPlaybook, location: new URL("https://www.example.com") };

    // Act
    await configurationService.updatePlaybook(updatedPlaybook);

    // Assert
    expect(storageService.write).toBeCalled();
  });

  //#endregion

  /**
   * ==========================================================================
   *                                 PROJECTS
   * ==========================================================================
   */
  //#region

  // get projects

  it("gets projects w/ existing configuration", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    const projects = await configurationService.getProjects();

    // Assert
    expect(projects).toBeTruthy();
    expect(storageService.read).toBeCalled();
  });

  it("gets projects w/out existing configuration", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    const projects = await configurationService.getProjects();

    // Assert
    expect(projects).toBeTruthy();
    expect(storageService.read).toBeCalled();
  });

  // add project

  it("adds a project w/out existing configuration", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>();
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.addProject(newProject);

    // Assert
    expect(storageService.write).toBeCalled();
  });

  it("adds a project w/ existing configuration but no projects", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.addProject(newProject);

    // Assert
    expect(storageService.write).toBeCalled();
  });

  it("adds a project w/ existing configuration and existing projects", async () => {
    // Setup
    configuration.projects.push(existingProject);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.addProject(newProject);

    // Assert
    expect(storageService.write).toBeCalled();
  });

  it("does not add a project w/ existing configuration and a matching project", async () => {
    // Setup
    configuration.projects.push(existingProject);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.addProject(existingProject);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not add a project w/ existing configuration multiple matching projects", async () => {
    // Setup
    configuration.projects.push(existingProject);
    configuration.projects.push(existingProject);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.addProject(existingProject);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  // remove project

  it("does not remove a project w/out existing configuration", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>();
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.removeProject(newProject.name);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not remove a project w/ existing configuration but no projects", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.removeProject(newProject.name);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not remove a project w/ existing configuration but no matching project", async () => {
    // Setup
    configuration.projects.push(existingProject);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.removeProject(newProject.name);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("removes a project w/ existing configuration and a matching project", async () => {
    // Setup
    configuration.projects.push(existingProject);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.removeProject(existingProject.name);

    // Assert
    expect(storageService.write).toBeCalled();
  });

  // selects a project

  it("does not select a project w/out existing configuration", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>();
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.selectProject(newProject.name);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not select a project w/ existing configuration but no projects", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.selectProject(newProject.name);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not select a project w/ existing configuration but no matching project", async () => {
    // Setup
    configuration.projects.push(existingProject);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.selectProject(newProject.name);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("selects a project w/ existing configuration and a matching project", async () => {
    // Setup
    configuration.projects.push({ ...existingProject, isActive: false });
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.selectProject(existingProject.name);

    // Assert
    expect(storageService.write).toBeCalled();
  });

  // deselects a project

  it("does not deselect a project w/out existing configuration", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>();
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.deselectProject(newProject.name);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not deselect a project w/ existing configuration but no projects", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.deselectProject(newProject.name);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not deselect a project w/ existing configuration but no matching project", async () => {
    // Setup
    configuration.projects.push(existingProject);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.deselectProject(newProject.name);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("deselects a project w/ existing configuration and a matching project", async () => {
    // Setup
    configuration.projects.push({ ...existingProject, isActive: true });
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.deselectProject(existingProject.name);

    // Assert
    expect(storageService.write).toBeCalled();
  });

  // update project

  it("does not update a project w/out existing configuration", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>();
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.updateProject(existingProject);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not update a project w/ existing configuration but no projects", async () => {
    // Setup
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.updateProject(existingProject);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not update a project w/ existing configuration but no matching projects", async () => {
    // Setup
    configuration.projects.push(existingProject);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.updateProject(newProject);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("does not update a project w/ existing configuration multiple matching projects", async () => {
    // Setup
    configuration.projects.push(existingProject);
    configuration.projects.push(existingProject);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);

    // Act
    await configurationService.updateProject(existingProject);

    // Assert
    expect(storageService.write).not.toBeCalled();
  });

  it("updates a project w/ existing configuration and a matching project", async () => {
    // Setup
    configuration.projects.push(existingProject);
    storageService = ServiceSimulator.createTestStorageService<Configuration>(configuration);
    const configurationService = new StoredConfigurationService(storageService, logger);
    const updatedProject = { ...existingProject, location: new URL("https://www.example.com") };

    // Act
    await configurationService.updateProject(updatedProject);

    // Assert
    expect(storageService.write).toBeCalled();
  });

  //#endregion
});
