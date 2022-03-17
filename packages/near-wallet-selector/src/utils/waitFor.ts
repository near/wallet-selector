const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const poll = (
  cb: () => boolean,
  interval: number,
  remaining: number
): Promise<unknown> | boolean | undefined => {
  const result = cb();

  if (result) {
    return result;
  }

  if (!remaining) {
    return;
  }

  return wait(interval).then(() => poll(cb, interval, remaining - 1));
};

export const waitFor = async (
  cb: () => boolean,
  opts: { timeout?: number; interval?: number } = {}
) => {
  const { timeout = 200, interval = 50 } = opts;

  return Promise.race([
    wait(timeout).then(() => {
      throw new Error("Exceeded timeout");
    }),
    poll(cb, interval, Math.floor(timeout / interval)),
  ]);
};
