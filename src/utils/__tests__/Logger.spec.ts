import { Logger } from "../Logger";

describe("Some logging behavior", () => {
  const log = console.log; // save original console.log function
  const warn = console.warn;
  const debug = console.debug;
  const error = console.error;
  const info = console.info;
  const logger = new Logger();
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
  it("no log", () => {
    // TODO: test something that should not log
    expect(console.log).not.toHaveBeenCalled();
  });
  it("some log", () => {
    // TODO: test something that should log
    logger.log("something");
    expect(console.log).toHaveBeenCalled();
  });
  it("some debug", () => {
    // TODO: test something that should log
    logger.debug("something");
    expect(console.debug).toHaveBeenCalled();
  });
  it("some warn", () => {
    // TODO: test something that should log
    logger.warn("something");
    expect(console.warn).toHaveBeenCalled();
  });
  it("some error", () => {
    // TODO: test something that should log
    logger.error("something");
    expect(console.error).toHaveBeenCalled();
  });
  it("some info", () => {
    // TODO: test something that should log
    logger.info("something");
    expect(console.info).toHaveBeenCalled();
  });
});
