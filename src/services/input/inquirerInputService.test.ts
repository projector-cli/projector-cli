/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServiceSimulator } from "../../test";
import { InquirerInputService } from "./inquirerInputService";
jest.mock("inquirer");
import inquirer from "inquirer";

describe("Inquirer Input Service", () => {
  const logger = ServiceSimulator.createTestLogger();

  it("asks a question and returns the response", async () => {
    const service = new InquirerInputService(logger);
    const question = "This is my question";
    const expectedAnswer = "my answer";
    const answerObject: { [question: string]: string } = {};
    answerObject[question] = expectedAnswer;
    inquirer.prompt = jest.fn(() => Promise.resolve(answerObject)) as any;
    const answer = await service.askQuestion(question);
    expect(inquirer.prompt).toBeCalledWith([
      {
        type: "input",
        name: question,
      },
    ]);
    expect(answer).toEqual(expectedAnswer);
  });

  it("asks a question with a default response for empty answer", async () => {
    const service = new InquirerInputService(logger);

    const question = "This is my question";
    const defaultAnswer = "my default answer";

    inquirer.prompt = jest.fn(() => Promise.resolve(undefined)) as any;
    const answer = await service.askQuestion(question, defaultAnswer);
    expect(inquirer.prompt).toBeCalledWith([
      {
        type: "input",
        name: question,
        default: defaultAnswer,
      },
    ]);
    expect(answer).toEqual(defaultAnswer);
  });

  it("asks a number question with a valid response", async () => {
    const service = new InquirerInputService(logger);

    const question = "Number question";
    const answerValue = "5";
    const answerObject: { [question: string]: string } = {};
    answerObject[question] = answerValue;

    inquirer.prompt = jest.fn(() => Promise.resolve(answerObject)) as any;

    const answer = await service.askNumberQuestion(question);
    expect(answer).toEqual(5);
  });

  it("asks a number question with an invalid response and asks question again", async () => {
    const service = new InquirerInputService(logger);

    const question = "Number question";

    const firstAnswerValue = "hello";
    const firstAnswerObject: { [question: string]: string } = {};
    firstAnswerObject[question] = firstAnswerValue;

    const secondAnswerValue = "4";
    const secondAnswerObject: { [question: string]: string } = {};
    secondAnswerObject[question] = secondAnswerValue;

    const prompt = jest.fn();
    prompt.mockReturnValueOnce(Promise.resolve(firstAnswerObject));
    prompt.mockReturnValueOnce(Promise.resolve(secondAnswerObject));

    inquirer.prompt = prompt as any;

    const answer = await service.askNumberQuestion(question);

    expect(answer).toEqual(+secondAnswerValue);
    expect(prompt).toBeCalledTimes(2);
  });

  it("confirms an action with default message", async () => {
    const service = new InquirerInputService(logger);

    const expectedQuestion = "Confirm?";
    const expectedAnswer = "yes";
    const answerObject: { [question: string]: string } = {};
    answerObject[expectedQuestion] = expectedAnswer;

    inquirer.prompt = jest.fn(() => Promise.resolve(answerObject)) as any;
    const answer = await service.confirmAction();

    expect(inquirer.prompt).toBeCalledWith([
      {
        type: "list",
        name: expectedQuestion,
        choices: ["yes", "no"],
      },
    ]);
    expect(answer).toEqual(true);
  });

  it("declines an action with default message", async () => {
    const service = new InquirerInputService(logger);

    const expectedQuestion = "Confirm?";
    const expectedAnswer = "no";
    const answerObject: { [question: string]: string } = {};
    answerObject[expectedQuestion] = expectedAnswer;

    inquirer.prompt = jest.fn(() => Promise.resolve(answerObject)) as any;
    const answer = await service.confirmAction();

    expect(inquirer.prompt).toBeCalledWith([
      {
        type: "list",
        name: expectedQuestion,
        choices: ["yes", "no"],
      },
    ]);
    expect(answer).toEqual(false);
  });

  it("confirms an action with custom message", async () => {
    const service = new InquirerInputService(logger);

    const expectedQuestion = "confirm this thing";
    const expectedAnswer = "yes";
    const answerObject: { [question: string]: string } = {};
    answerObject[expectedQuestion] = expectedAnswer;

    inquirer.prompt = jest.fn(() => Promise.resolve(answerObject)) as any;
    const answer = await service.confirmAction(expectedQuestion);

    expect(inquirer.prompt).toBeCalledWith([
      {
        type: "list",
        name: expectedQuestion,
        choices: ["yes", "no"],
      },
    ]);
    expect(answer).toEqual(true);
  });

  it("declines an action with custom message", async () => {
    const service = new InquirerInputService(logger);

    const expectedQuestion = "confirm this thing";
    const expectedAnswer = "no";
    const answerObject: { [question: string]: string } = {};
    answerObject[expectedQuestion] = expectedAnswer;

    inquirer.prompt = jest.fn(() => Promise.resolve(answerObject)) as any;
    const answer = await service.confirmAction(expectedQuestion);

    expect(inquirer.prompt).toBeCalledWith([
      {
        type: "list",
        name: expectedQuestion,
        choices: ["yes", "no"],
      },
    ]);
    expect(answer).toEqual(false);
  });
});
