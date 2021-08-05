import { Dictionary, Logger } from "../../models";
import { InputService } from "../input";
import { prompt } from "inquirer";

export class InquirerInputService implements InputService {
  private logger: Logger;

  public constructor(logger: Logger) {
    this.logger = logger;
  }

  public async confirmAction(message?: string): Promise<boolean> {
    const response = await this.multiChoiceQuestion(message || "Confirm?", ["yes", "no"]);
    return response === "yes";
  }

  public async askQuestion(question: string, defaultAnswer?: string): Promise<string> {
    const response = await prompt([
      {
        type: "input",
        name: question,
        default: defaultAnswer,
      },
    ]);

    if (!response) {
      if (defaultAnswer) {
        return defaultAnswer;
      } else {
        this.logger.log("Need to answer the question");
        return this.askQuestion(question, defaultAnswer);
      }
    } else {
      return this.extractSingleQuestionAnswer(response);
    }
  }

  public async askNumberQuestion(question: string, defaultAnswer?: number): Promise<number> {
    const response = await this.askQuestion(question, defaultAnswer?.toString());

    const parsed = Number.parseFloat(response);

    if (Number.isNaN(parsed)) {
      this.logger.warn("Invalid response");
      return this.askNumberQuestion(question, defaultAnswer);
    }
    return parsed;
  }

  public async multiChoiceQuestion(question: string, choices: string[]): Promise<string> {
    const response = await prompt([
      {
        type: "list",
        name: question,
        choices,
      },
    ]);

    return this.extractSingleQuestionAnswer(response);
  }

  private extractSingleQuestionAnswer(responseObject: Dictionary): string {
    const keys = Object.keys(responseObject);
    if (keys.length > 1) {
      throw new Error("Expected only one answer");
    }

    const subObject = responseObject[keys[0]];
    if (typeof subObject === "string") {
      return subObject;
    }

    return this.extractSingleQuestionAnswer(subObject);
  }
}
