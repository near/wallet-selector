export interface LoggerService {
    log(...params: Array<unknown>): void;
    info(...params: Array<unknown>): void;
    warn(...params: Array<unknown>): void;
    error(...params: Array<unknown>): void;
}
