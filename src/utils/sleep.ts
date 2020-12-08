/**
 * Sleep for number of seconds
 *
 * @param {number} seconds Number of seconds to sleep
 * @returns {Promise<void>} Promise
 */
export function sleep(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}
