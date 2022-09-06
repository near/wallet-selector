interface RetryOptions {
  retries?: number;
  interval?: number;
}

const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const retry = <Value>(
  func: () => Promise<Value>,
  opts: RetryOptions = {}
): Promise<Value> => {
  const { retries = 5, interval = 500 } = opts;

  return func().catch((err) => {
    if (retries <= 1) {
      throw err;
    }

    return timeout(interval).then(() => {
      return retry(func, {
        ...opts,
        retries: retries - 1,
        interval: interval * 1.5,
      });
    });
  });
};
