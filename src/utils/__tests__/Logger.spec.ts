import { Logger } from "../Logger";

describe("Some logging behavior", () => {
  const log = console.log; // save original console.log function
  const warn = console.warn;
  const debug = console.debug;
  const error = console.error;
  const info = console.info;
  const logger = new Logger();
  logger.doActive = true;

  beforeEach(() => {
    console.log = jest.fn(); // create a new mock function for each test
    console.warn = jest.fn();
    console.error = jest.fn();
    console.debug = jest.fn();
    console.info = jest.fn();
  });
  afterAll(() => {
    console.log = log; // restore original console.log after all tests
    console.warn = warn;
    console.error = error;
    console.debug = debug;
    console.info = info;
  });
  it("no log in production", () => {
    // TODO: test something that should not log
    logger.doActive = false;
    logger.log("production log");
    expect(console.log).not.toHaveBeenCalled();
    logger.doActive = true;
  });
  it("some log", () => {
    // TODO: test something that should log
    logger.log("something");
    expect(console.log).toHaveBeenCalledWith("something");
  });
  it("some debug", () => {
    // TODO: test something that should log
    logger.debug("something");
    expect(console.debug).toHaveBeenCalledWith("something");
  });
  it("some warn", () => {
    // TODO: test something that should log
    logger.warn("something");
    expect(console.warn).toHaveBeenCalledWith("something");
  });
  it("some error", () => {
    // TODO: test something that should log
    logger.error("something");
    expect(console.error).toHaveBeenCalledWith("something");
  });
  it("some info", () => {
    // TODO: test something that should log
    logger.info("something");
    expect(console.info).toHaveBeenCalledWith("something");
  });
});
