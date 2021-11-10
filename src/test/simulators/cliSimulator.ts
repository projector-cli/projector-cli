export interface CliArg {
  name: string;
  value?: string | string[];
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
        if (Array.isArray(value)) {
          command.push(...value);
        } else {
          command.push(value);
        }
      }
    });
    return command;
  }
}
