export class Logger {
  private static _debug = false;

  static get debug(): boolean {
    return Logger._debug;
  }

  static set debug(value: boolean) {
    Logger._debug = value;
  }

  constructor(private readonly logger: Console = window?.console) {}

  log(...params: Array<unknown>) {
    this.trigger("log", ...params);
  }

  error(...params: Array<unknown>) {
    this.trigger("error", ...params);
  }

  info(...params: Array<unknown>) {
    this.trigger("info", ...params);
  }

  warn(...params: Array<unknown>) {
    this.trigger("warn", ...params);
  }

  private trigger(method: keyof Console, ...args: Array<unknown>) {
    if (!Logger._debug) {
      return;
    }

    this.logger[method].apply(console, args);
  }
}

export const logger = new Logger();
