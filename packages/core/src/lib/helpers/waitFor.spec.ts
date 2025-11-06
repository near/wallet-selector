import { waitFor } from "./waitFor";

describe("waitFor", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should resolve when condition becomes true", async () => {
    let conditionMet = false;

    const promise = waitFor(() => conditionMet, {
      timeout: 1000,
      interval: 100,
    });

    jest.advanceTimersByTime(100);
    conditionMet = true;
    jest.advanceTimersByTime(100);

    await expect(promise).resolves.toBe(true);
  });

  it("should throw error when timeout is exceeded", async () => {
    const conditionMet = false;

    const promise = waitFor(() => conditionMet, {
      timeout: 200,
      interval: 50,
    });

    jest.advanceTimersByTime(250);

    await expect(promise).rejects.toThrow("Exceeded timeout");
  });

  it("should use custom timeout and interval options", async () => {
    let conditionMet = false;

    const promise = waitFor(() => conditionMet, {
      timeout: 500,
      interval: 200,
    });

    jest.advanceTimersByTime(200);
    conditionMet = true;
    jest.advanceTimersByTime(200);

    await expect(promise).resolves.toBe(true);
  });

  it("should use default timeout and interval when options not provided", async () => {
    let conditionMet = false;

    const promise = waitFor(() => conditionMet);

    conditionMet = true;
    jest.advanceTimersByTime(50);

    await expect(promise).resolves.toBe(true);
  });

  it("should resolve immediately when condition is already true", async () => {
    const conditionMet = true;

    const promise = waitFor(() => conditionMet, {
      timeout: 1000,
      interval: 100,
    });

    jest.advanceTimersByTime(10);

    await expect(promise).resolves.toBe(true);
  });

  it("should poll condition multiple times at specified interval", async () => {
    let checkCount = 0;
    let conditionMet = false;

    const promise = waitFor(
      () => {
        checkCount++;
        return conditionMet;
      },
      {
        timeout: 1000,
        interval: 100,
      }
    );

    jest.advanceTimersByTime(100);
    expect(checkCount).toBeGreaterThan(0);

    jest.advanceTimersByTime(100);
    conditionMet = true;
    jest.advanceTimersByTime(100);

    await expect(promise).resolves.toBe(true);
    expect(checkCount).toBeGreaterThan(1);
  });
});
