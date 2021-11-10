import { AgileServiceProvider } from "../../services";
import { ServiceCollection } from "./serviceCollection";

/**
 * Configuration for interactive options
 */
export interface OptionInteractive<T = string> {
  /**
   * Short flag name (e.g. -n, -r, -t)
   */
  shortName: string;
  /**
   * Long flag name (e.g. --name, --file-path)
   */
  longName: string;
  /**
   * Limits user prompts when agile provider matches
   */
  agileServiceProviders?: AgileServiceProvider[];
  /**
   * Question to prompt users for correct value
   */
  prompt?: string;
  /**
   * Description of flag
   */
  description?: string;
  /**
   * Options to choose from
   */
  choices?: T[] | ((serviceCollection: ServiceCollection) => T[] | Promise<T[]>);
  /**
   * Default value of option
   */
  defaultValue?: T;
}
