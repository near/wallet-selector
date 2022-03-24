"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logging_service_1 = require("./logging.service");
var jest_mock_extended_1 = require("jest-mock-extended");
describe("LoggingService Unit Tests", function () {
    var logger;
    var internal;
    beforeAll(function () {
        internal = (0, jest_mock_extended_1.mock)();
        logger = new logging_service_1.Logger(internal);
    });
    beforeEach(function () {
        logging_service_1.Logger.debug = true;
    });
    afterEach(function () {
        // Reset the mock after the JS stack has cleared
        (0, jest_mock_extended_1.mockReset)(internal);
    });
    it("should be a singleton", function () {
        var logger2 = new logging_service_1.Logger(internal);
        expect(logger).toEqual(logger2);
    });
    it("should hide logs if hidden", function () {
        logging_service_1.Logger.debug = false;
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
        expect(logging_service_1.logger).toBeInstanceOf(logging_service_1.Logger);
    });
});
