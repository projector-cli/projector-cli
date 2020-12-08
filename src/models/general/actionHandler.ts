import { ServiceCollection } from "./serviceCollection";

/**
 * Command action handler
 */
export type ActionHandler<T> = (
  /**
   * Collection of services
   */
  serviceCollection: ServiceCollection,
  /**
   * Command options
   */
  options: T,
) => void | Promise<void>;
