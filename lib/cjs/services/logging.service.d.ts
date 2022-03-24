export declare class Logger {
    private readonly logger;
    private static _debug;
    static get debug(): boolean;
    static set debug(value: boolean);
    constructor(logger?: Console);
    log(...params: Array<unknown>): void;
    error(...params: Array<unknown>): void;
    info(...params: Array<unknown>): void;
    warn(...params: Array<unknown>): void;
    private trigger;
}
export declare const logger: Logger;
