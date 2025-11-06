import { isCurrentBrowserSupported } from "./detect-browser";
import type { Browser } from "./detect-browser";

describe("isCurrentBrowserSupported", () => {
  const originalNavigator = global.navigator;

  afterEach(() => {
    global.navigator = originalNavigator;
  });

  it("should detect Chrome correctly", () => {
    Object.defineProperty(global, "navigator", {
      value: {
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      writable: true,
      configurable: true,
    });

    const supportedBrowsers: Array<Browser> = ["chrome", "firefox"];
    const result = isCurrentBrowserSupported(supportedBrowsers);

    expect(result).toBe(true);
  });

  it("should detect Firefox correctly", () => {
    Object.defineProperty(global, "navigator", {
      value: {
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
      },
      writable: true,
      configurable: true,
    });

    const supportedBrowsers: Array<Browser> = ["chrome", "firefox"];
    const result = isCurrentBrowserSupported(supportedBrowsers);

    expect(result).toBe(true);
  });

  it("should detect Safari correctly", () => {
    Object.defineProperty(global, "navigator", {
      value: {
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
      },
      writable: true,
      configurable: true,
    });

    const supportedBrowsers: Array<Browser> = ["safari", "chrome"];
    const result = isCurrentBrowserSupported(supportedBrowsers);

    expect(result).toBe(true);
  });

  it("should return false for unsupported browsers", () => {
    Object.defineProperty(global, "navigator", {
      value: {
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
      },
      writable: true,
      configurable: true,
    });

    const supportedBrowsers: Array<Browser> = ["chrome", "firefox"];
    const result = isCurrentBrowserSupported(supportedBrowsers);

    expect(result).toBe(false);
  });

  it("should return false when navigator is undefined (server-side)", () => {
    // @ts-expect-error - Intentionally removing navigator for testing
    delete global.navigator;

    const supportedBrowsers: Array<Browser> = ["chrome", "firefox"];
    const result = isCurrentBrowserSupported(supportedBrowsers);

    expect(result).toBe(false);
  });

  it("should detect Edge Chromium correctly", () => {
    Object.defineProperty(global, "navigator", {
      value: {
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59",
      },
      writable: true,
      configurable: true,
    });

    const supportedBrowsers: Array<Browser> = ["edge-chromium", "chrome"];
    const result = isCurrentBrowserSupported(supportedBrowsers);

    expect(result).toBe(true);
  });

  it("should return false when supported browsers array is empty", () => {
    Object.defineProperty(global, "navigator", {
      value: {
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      writable: true,
      configurable: true,
    });

    const supportedBrowsers: Array<Browser> = [];
    const result = isCurrentBrowserSupported(supportedBrowsers);

    expect(result).toBe(false);
  });

  it("should return false when detected browser is not in supported list", () => {
    Object.defineProperty(global, "navigator", {
      value: {
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      writable: true,
      configurable: true,
    });

    const supportedBrowsers: Array<Browser> = ["firefox", "safari"];
    const result = isCurrentBrowserSupported(supportedBrowsers);

    expect(result).toBe(false);
  });
});
