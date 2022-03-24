import { Logger, logger as defaultLogger } from "./logging.service";
import { mock, mockReset } from "jest-mock-extended";
describe("LoggingService Unit Tests", function () {
    var logger;
    var internal;
    beforeAll(function () {
        internal = mock();
        logger = new Logger(internal);
    });
    beforeEach(function () {
        Logger.debug = true;
    });
    afterEach(function () {
        // Reset the mock after the JS stack has cleared
        mockReset(internal);
    });
    it("should be a singleton", function () {
        var logger2 = new Logger(internal);
        expect(logger).toEqual(logger2);
    });
    it("should hide logs if hidden", function () {
        Logger.debug = false;
        logger.log("test");
        expect(internal.log).not.toHaveBeenCalled();
    });
    it("should show logs if not hidden", function () {
        logger.log("test");
        expect(internal.log).toHaveBeenCalled();
    });
    it("should log", function () {
        logger.log("test");
        expect(internal.log).toHaveBeenCalledWith("test");
    });
    it("should info", function () {
        logger.info("test");
        expect(internal.info).toHaveBeenCalledWith("test");
    });
    it("should warn", function () {
        logger.warn("test");
        expect(internal.warn).toHaveBeenCalledWith("test");
    });
    it("should error", function () {
        logger.error("test");
        expect(internal.error).toHaveBeenCalledWith("test");
    });
    it("should export a default instance", function () {
        expect(defaultLogger).toBeInstanceOf(Logger);
    });
});
