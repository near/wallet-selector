import type { LoggerService } from "./logger.service.types";
export declare class Logger implements LoggerService {
    static debug: boolean;
    namespace?: string;
    constructor(namespace?: string);
    private emit;
    log(...params: Array<unknown>): void;
    info(...params: Array<unknown>): void;
    warn(...params: Array<unknown>): void;
    error(...params: Array<unknown>): void;
}
export declare const logger: Logger;
