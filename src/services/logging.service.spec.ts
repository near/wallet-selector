import { Logger, logger as defaultLogger } from "./logging.service";
import { mock, mockReset } from "jest-mock-extended";

describe("LoggingService Unit Tests", () => {
  let logger: Logger;
  let internal: Console;

  beforeAll(() => {
    internal = mock<Console>();
    logger = new Logger(internal);
  });

  beforeEach(() => {
    Logger.debug = true;
  });

  afterEach(() => {
    // Reset the mock after the JS stack has cleared
    mockReset(internal);
  });

  it("should be a singleton", () => {
    const logger2 = new Logger(internal);
    expect(logger).toEqual(logger2);
  });

  it("should hide logs if hidden", () => {
    Logger.debug = false;
    logger.log("test");
    expect(internal.log).not.toHaveBeenCalled();
  });

  it("should show logs if not hidden", () => {
    logger.log("test");
    expect(internal.log).toHaveBeenCalled();
  });

  it("should log", () => {
    logger.log("test");
    expect(internal.log).toHaveBeenCalledWith("test");
  });

  it("should info", () => {
    logger.info("test");
    expect(internal.info).toHaveBeenCalledWith("test");
  });

  it("should warn", () => {
    logger.warn("test");
    expect(internal.warn).toHaveBeenCalledWith("test");
  });

  it("should error", () => {
    logger.error("test");
    expect(internal.error).toHaveBeenCalledWith("test");
  });

  it("should export a default instance", () => {
    expect(defaultLogger).toBeInstanceOf(Logger);
  });
});
