export interface LoggerService {
  log(...params: Array<unknown>): void;
  error(...params: Array<unknown>): void;
}
