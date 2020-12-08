import { sleep } from "./sleep";

/**
 * Retry async function for a specified number of times, sleeping between each try
 *
 * @typedef T The return type of the action to retry
 * @param {() => Promise<T>} action Function to be executed
 * @param {number} retriesAllowed Retries allowed. Default to 3
 * @param {number} sleepBetweenRetries Seconds to sleep between tries. Default to 1
 * @returns {Promise} Result of action
 */
export async function retryAsync<T>(action: () => Promise<T>, retriesAllowed = 3, sleepBetweenRetries = 1): Promise<T> {
  let currentRetries = 0;
  while (currentRetries < retriesAllowed) {
    try {
      return await action();
    } catch (err) {
      currentRetries++;
      await sleep(sleepBetweenRetries);
    }
  }
  throw new Error(`Reached max number of retries: ${retriesAllowed}`);
}
