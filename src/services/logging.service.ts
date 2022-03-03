export class Logger
  implements Pick<Console, "log" | "info" | "warn" | "error">
{
  private static _hidden = true;
  static get debug(): boolean {
    return Logger._hidden;
  }
  static set debug(value: boolean) {
    Logger._hidden = value;
  }
  constructor(private readonly logger: Console = window?.console) {}

  log(...params: unknown[]): void {
    this.trigger("log", ...params);
  }

  error(...params: unknown[]): void {
    this.trigger("error", ...params);
  }

  info(...params: unknown[]): void {
    this.trigger("info", ...params);
  }

  warn(...params: unknown[]): void {
    this.trigger("warn", ...params);
  }

  private trigger(method: keyof Console, ...args: unknown[]) {
    if (!Logger.debug) {
      return;
    }

    this.logger[method].apply(console, args);
  }
}

export const logger = new Logger();
