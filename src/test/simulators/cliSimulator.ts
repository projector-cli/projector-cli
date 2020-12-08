export interface CliArg {
  name: string;
  value?: string;
}

export class CliSimulator {
  public static createArgs(args?: CliArg[]): string[] {
    const command = ["node.exe", "index.js", "commandName"];

    if (!args) {
      return command;
    }

    args.forEach((arg) => {
      const { name, value } = arg;
      command.push(name);
      if (value) {
        command.push(value);
      }
    });
    return command;
  }

  public static createRepoArgs(args?: CliArg[], repoName?: string): string[] {
    return this.createWithOptionalArgs(
      [
        {
          name: "--repo-provider",
          value: "simulator",
        },
        {
          name: "--base-url",
          value: "https://url.com",
        },
        {
          name: "--access-token",
          value: "token",
        },
        {
          name: "--repo-name",
          value: repoName || "my-project",
        },
      ],
      args,
    );
  }

  public static createAgileArgs(args?: CliArg[]): string[] {
    return this.createWithOptionalArgs(
      [
        {
          name: "--agile-provider",
          value: "simulator",
        },
        {
          name: "--base-url",
          value: "https://url.com",
        },
        {
          name: "--access-token",
          value: "token",
        },
        {
          name: "--project-name",
          value: "my-project",
        },
      ],
      args,
    );
  }

  public static createPlaybookArgs(args?: CliArg[]): string[] {
    return this.createWithOptionalArgs(
      [
        {
          name: "--playbook-access-token",
          value: "token",
        },
      ],
      args,
    );
  }

  private static createWithOptionalArgs(args: CliArg[], optional?: CliArg[]): string[] {
    if (optional) {
      optional.forEach((opt) => args.push(opt));
    }
    return this.createArgs(args);
  }
}
