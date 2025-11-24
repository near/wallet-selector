import { Logger, logger } from "../../services";

describe("Logger", () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleInfoSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    consoleInfoSpy = jest.spyOn(console, "info").mockImplementation();
    consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
  });

  afterEach(() => {
    Logger.debug = false;
    jest.clearAllMocks();
  });

  describe("constructor", () => {
    it("should create logger instance without namespace", () => {
      const loggerInstance = new Logger();
      expect(loggerInstance).toBeInstanceOf(Logger);
      expect(loggerInstance.namespace).toBeUndefined();
    });

    it("should create logger instance with namespace", () => {
      const loggerInstance = new Logger("test-namespace");
      expect(loggerInstance).toBeInstanceOf(Logger);
      expect(loggerInstance.namespace).toBe("test-namespace");
    });
  });

  describe("when debug is disabled", () => {
    beforeEach(() => {
      Logger.debug = false;
    });

    it("should not log when debug is false", () => {
      const loggerInstance = new Logger();
      loggerInstance.log("test message");

      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it("should not info when debug is false", () => {
      const loggerInstance = new Logger();
      loggerInstance.info("test message");

      expect(consoleInfoSpy).not.toHaveBeenCalled();
    });

    it("should not warn when debug is false", () => {
      const loggerInstance = new Logger();
      loggerInstance.warn("test message");

      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it("should not error when debug is false", () => {
      const loggerInstance = new Logger();
      loggerInstance.error("test message");

      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
  });

  describe("when debug is enabled", () => {
    beforeEach(() => {
      Logger.debug = true;
    });

    describe("log method", () => {
      it("should log without namespace", () => {
        const loggerInstance = new Logger();
        loggerInstance.log("test message", 123, { key: "value" });

        expect(consoleLogSpy).toHaveBeenCalledWith("test message", 123, {
          key: "value",
        });
        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      });

      it("should log with namespace", () => {
        const loggerInstance = new Logger("my-namespace");
        loggerInstance.log("test message", 123);

        expect(consoleLogSpy).toHaveBeenCalledWith(
          "my-namespace",
          "test message",
          123
        );
        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      });

      it("should handle multiple parameters", () => {
        const loggerInstance = new Logger("test");
        loggerInstance.log("param1", "param2", "param3");

        expect(consoleLogSpy).toHaveBeenCalledWith(
          "test",
          "param1",
          "param2",
          "param3"
        );
      });
    });

    describe("info method", () => {
      it("should info without namespace", () => {
        const loggerInstance = new Logger();
        loggerInstance.info("info message", 456);

        expect(consoleInfoSpy).toHaveBeenCalledWith("info message", 456);
        expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
      });

      it("should info with namespace", () => {
        const loggerInstance = new Logger("my-namespace");
        loggerInstance.info("info message");

        expect(consoleInfoSpy).toHaveBeenCalledWith(
          "my-namespace",
          "info message"
        );
        expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe("warn method", () => {
      it("should warn without namespace", () => {
        const loggerInstance = new Logger();
        loggerInstance.warn("warning message");

        expect(consoleWarnSpy).toHaveBeenCalledWith("warning message");
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
      });

      it("should warn with namespace", () => {
        const loggerInstance = new Logger("my-namespace");
        loggerInstance.warn("warning message", "extra");

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          "my-namespace",
          "warning message",
          "extra"
        );
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe("error method", () => {
      it("should error without namespace", () => {
        const loggerInstance = new Logger();
        loggerInstance.error("error message", new Error("test error"));

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "error message",
          new Error("test error")
        );
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      });

      it("should error with namespace but not include namespace prefix", () => {
        const loggerInstance = new Logger("my-namespace");
        loggerInstance.error("error message");

        // Error method should NOT include namespace prefix
        expect(consoleErrorSpy).toHaveBeenCalledWith("error message");
        expect(consoleErrorSpy).not.toHaveBeenCalledWith(
          "my-namespace",
          "error message"
        );
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      });

      it("should handle error objects", () => {
        const loggerInstance = new Logger();
        const error = new Error("test error");
        loggerInstance.error("Something went wrong", error);

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Something went wrong",
          error
        );
      });
    });

    describe("edge cases", () => {
      it("should handle empty parameters", () => {
        const loggerInstance = new Logger("test");
        loggerInstance.log();

        expect(consoleLogSpy).toHaveBeenCalledWith("test");
      });

      it("should handle null and undefined values", () => {
        const loggerInstance = new Logger();
        loggerInstance.log(null, undefined, "value");

        expect(consoleLogSpy).toHaveBeenCalledWith(null, undefined, "value");
      });

      it("should handle objects and arrays", () => {
        const loggerInstance = new Logger("test");
        const obj = { nested: { value: 123 } };
        const arr = [1, 2, 3];
        loggerInstance.log(obj, arr);

        expect(consoleLogSpy).toHaveBeenCalledWith("test", obj, arr);
      });
    });
  });

  describe("logger singleton", () => {
    it("should export a logger instance", () => {
      expect(logger).toBeInstanceOf(Logger);
    });

    it("should respect debug flag", () => {
      Logger.debug = true;
      logger.log("test");

      expect(consoleLogSpy).toHaveBeenCalledWith("test");

      jest.clearAllMocks();
      Logger.debug = false;
      logger.log("test");

      expect(consoleLogSpy).not.toHaveBeenCalled();
    });
  });

  describe("debug flag changes", () => {
    it("should respond to debug flag changes dynamically", () => {
      const loggerInstance = new Logger("test");

      Logger.debug = false;
      loggerInstance.log("message 1");
      expect(consoleLogSpy).not.toHaveBeenCalled();

      Logger.debug = true;
      loggerInstance.log("message 2");
      expect(consoleLogSpy).toHaveBeenCalledWith("test", "message 2");

      Logger.debug = false;
      loggerInstance.log("message 3");
      expect(consoleLogSpy).toHaveBeenCalledTimes(1); // Only message 2
    });
  });
});
