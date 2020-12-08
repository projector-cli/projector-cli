import { BaseLogger } from "../../services";

export class SimulatorLogger extends BaseLogger {
  debug = jest.fn();
  log = jest.fn();
  warn = jest.fn();
  error = jest.fn();
}
