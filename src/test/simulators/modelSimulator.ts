import { ProjectVisibility } from "azure-devops-node-api/interfaces/CoreInterfaces";
import {
  AgileProviderOptions,
  BacklogItem,
  Template,
  BacklogItemType,
  GitHubLabel,
  GitHubMilestone,
  Project,
  Repo,
  RepoItem,
  RepoItemType,
  RepoProviderOptions,
  ServiceProviderOptions,
  Configuration,
} from "../../models";
import { AgileServiceProvider, RepoServiceProvider } from "../../services";

export class ModelSimulator {
  public static createTestTemplate(): Template {
    return {
      name: "My Template",
      description: "This is my template",
      items: this.createTestBacklogItems(),
    };
  }

  public static createTestServiceProviderOptions(): ServiceProviderOptions {
    return {
      accessToken: "access-token",
      baseUrl: "https://url.com/owner",
      projectName: "project-name",
    };
  }

  public static createTestAgileProviderOptions(): AgileProviderOptions {
    return {
      ...this.createTestServiceProviderOptions(),
      agileProvider: AgileServiceProvider.Simulator,
    };
  }

  public static createTestRepoProviderOptions(): RepoProviderOptions {
    return {
      ...this.createTestServiceProviderOptions(),
      repoProvider: RepoServiceProvider.Simulator,
    };
  }

  public static createTestBacklogItems(): BacklogItem[] {
    return [
      {
        name: "My Story",
        type: BacklogItemType.Story,
        children: [
          {
            name: "My Task",
            type: BacklogItemType.Task,
          },
        ],
      },
    ];
  }

  public static createTestRepo(): Repo {
    return {
      name: "test-repo",
    };
  }

  public static createTestProject(): Project {
    return {
      id: "id",
      name: "project-name",
      description: "My project",
      capabilities: {
        versioncontrol: {
          sourceControlType: "git",
        },
        processTemplate: {
          templateTypeId: "template id",
        },
      },
      visibility: ProjectVisibility.Organization,
    };
  }

  public static createTestRepoItem(): RepoItem {
    return {
      name: "my-item.txt",
      path: "item/path/txt",
      type: RepoItemType.File,
      content: this.createTestTemplate(),
    };
  }

  public static createGitHubLabel(): GitHubLabel {
    return {
      id: 123,
      name: "my-label",
      color: "blue",
      description: "This is my label",
    };
  }

  public static createGitHubMilestone(): GitHubMilestone {
    return {
      id: 123,
      due_on: "1/1/2021",
      number: 456,
      title: "This is my milestone",
      description: "This is my description",
    };
  }

  public static createConfiguration(): Configuration {
    return {
      playbooks: [],
      projects: [],
      appInsights: {
        instrumentationKey: "key",
        enabled: true,
      },
    };
  }
}
