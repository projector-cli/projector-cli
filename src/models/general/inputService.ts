export interface InputService {
  confirmAction(message?: string): Promise<boolean>;
  askQuestion(question: string, defaultAnswer?: string): Promise<string>;
  askNumberQuestion(question: string, defaultAnswer?: number): Promise<number>;
  multiChoiceQuestion(question: string, choices: string[]): Promise<string>;
}
