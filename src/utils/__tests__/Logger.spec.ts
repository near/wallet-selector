import { Logger } from "../Logger";

describe("Some logging behavior", () => {
  const log = console.log; // save original console.log function
  const warn = console.warn;
  const debug = console.debug;
  const error = console.error;
  const info = console.info;
  const logger = new Logger();
  const message = "something";
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
    logger.log(message);
    expect(console.log).toHaveBeenCalledWith(message);
  });
  it("some debug", () => {
    // TODO: test something that should log
    logger.debug(message);
    expect(console.debug).toHaveBeenCalledWith(message);
  });
  it("some warn", () => {
    // TODO: test something that should log
    logger.warn(message);
    expect(console.warn).toHaveBeenCalledWith(message);
  });
  it("some error", () => {
    // TODO: test something that should log
    logger.error(message);
    expect(console.error).toHaveBeenCalledWith(message);
  });
  it("some info", () => {
    // TODO: test something that should log
    logger.info(message);
    expect(console.info).toHaveBeenCalledWith(message);
  });
});
