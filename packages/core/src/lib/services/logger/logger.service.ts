import type { LoggerService } from "./logger.service.types";

type SupportedMethod = "log" | "info" | "warn" | "error";

export class Logger implements LoggerService {
  static debug = false;

  namespace?: string;

  constructor(namespace?: string) {
    this.namespace = namespace;
  }

  private emit(method: SupportedMethod, ...params: Array<unknown>) {
    if (!Logger.debug) {
      return;
    }

    if (this.namespace && method !== "error") {
      // eslint-disable-next-line no-console
      console[method](this.namespace, ...params);

      return;
    }

    // eslint-disable-next-line no-console
    console[method](...params);
  }

  log(...params: Array<unknown>) {
    this.emit("log", ...params);
  }

  info(...params: Array<unknown>) {
    this.emit("info", ...params);
  }

  warn(...params: Array<unknown>) {
    this.emit("warn", ...params);
  }

  error(...params: Array<unknown>) {
    this.emit("error", ...params);
  }
}

export const logger = new Logger();
