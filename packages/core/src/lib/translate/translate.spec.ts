/* eslint-disable @typescript-eslint/no-explicit-any*/
import { translate, allowOnlyLanguage } from "./translate";

describe("translate", () => {
  const originalWindow = global.window;

  beforeEach(() => {
    allowOnlyLanguage(undefined);
  });

  afterEach(() => {
    if (originalWindow) {
      global.window = originalWindow;
    } else {
      // @ts-expect-error - Intentionally removing for cleanup
      delete global.window;
    }
  });

  describe("default behavior", () => {
    it("should return English text by default", () => {
      global.window = {
        navigator: {
          language: "en",
          languages: ["en"],
        },
      } as any;

      const result = translate("modal.wallet.connectYourWallet");

      expect(result).toBe("Connect Your Wallet");
    });

    it("should return key when translation is missing", () => {
      global.window = {
        navigator: {
          language: "en",
          languages: ["en"],
        },
      } as any;

      const result = translate("non.existent.key");

      expect(result).toBe("non.existent.key");
    });
  });

  describe("language detection", () => {
    it("should return Spanish translation for Spanish browser", () => {
      global.window = {
        navigator: {
          language: "es",
          languages: ["es"],
        },
      } as any;

      const result = translate("modal.wallet.connectYourWallet");

      expect(result).toBe("Conecta Tu Billetera");
    });

    it("should use navigator.languages[0] when available", () => {
      global.window = {
        navigator: {
          language: "en",
          languages: ["es", "en"],
        },
      } as any;

      const result = translate("modal.wallet.connectYourWallet");

      expect(result).toBe("Conecta Tu Billetera");
    });

    it("should fallback to navigator.language when languages array is empty", () => {
      global.window = {
        navigator: {
          language: "es",
          languages: [],
        },
      } as any;

      const result = translate("modal.wallet.connectYourWallet");

      expect(result).toBe("Conecta Tu Billetera");
    });
  });

  describe("language code shortening", () => {
    it("should shorten language code with hyphen (en-US -> en)", () => {
      global.window = {
        navigator: {
          language: "en-US",
          languages: ["en-US"],
        },
      } as any;

      const result = translate("modal.wallet.connectYourWallet");

      expect(result).toBe("Connect Your Wallet");
    });

    it("should shorten language code with underscore (en_GB -> en)", () => {
      global.window = {
        navigator: {
          language: "en_GB",
          languages: ["en_GB"],
        },
      } as any;

      const result = translate("modal.wallet.connectYourWallet");

      expect(result).toBe("Connect Your Wallet");
    });
  });

  describe("allowOnlyLanguage override", () => {
    it("should use allowOnlyLanguage override instead of browser language", () => {
      allowOnlyLanguage("es");

      global.window = {
        navigator: {
          language: "en",
          languages: ["en"],
        },
      } as any;

      const result = translate("modal.wallet.connectYourWallet");

      expect(result).toBe("Conecta Tu Billetera");
    });

    it("should use browser language when allowOnlyLanguage is undefined", () => {
      allowOnlyLanguage(undefined);

      global.window = {
        navigator: {
          language: "es",
          languages: ["es"],
        },
      } as any;

      const result = translate("modal.wallet.connectYourWallet");

      expect(result).toBe("Conecta Tu Billetera");
    });

    it("should shorten override language code correctly", () => {
      allowOnlyLanguage("es");

      global.window = {
        navigator: {
          language: "en",
          languages: ["en"],
        },
      } as any;

      const result = translate("modal.wallet.connectYourWallet");

      expect(result).toBe("Conecta Tu Billetera");
    });
  });

  describe("nested object paths", () => {
    it("should handle nested object paths correctly", () => {
      global.window = {
        navigator: {
          language: "en",
          languages: ["en"],
        },
      } as any;

      const result = translate("modal.wallet.connectingMessage.injected");

      expect(result).toBe("Confirm the connection in the extension window");
    });

    it("should return key when nested path is invalid", () => {
      global.window = {
        navigator: {
          language: "en",
          languages: ["en"],
        },
      } as any;

      const result = translate("modal.wallet.invalid.path");

      expect(result).toBe("modal.wallet.invalid.path");
    });
  });

  describe("unsupported languages", () => {
    it("should fallback to English for unsupported language", () => {
      global.window = {
        navigator: {
          language: "fr-FR",
          languages: ["fr-FR"],
        },
      } as any;

      const result = translate("modal.wallet.connectYourWallet");

      expect(result).toBe("Connect Your Wallet");
    });
  });
});
