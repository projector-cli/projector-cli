import { retryAsync } from "./retry";

describe("Retry", () => {
  it("retries set number of times", async () => {
    const numberOfRetries = 5;
    const action = jest.fn(() => Promise.reject());
    await expect(retryAsync(() => action(), numberOfRetries, 0)).rejects.toThrow();
    expect(action).toBeCalledTimes(numberOfRetries);
  });
});
