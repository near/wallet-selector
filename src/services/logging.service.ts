export class Logger
  implements Pick<Console, "log" | "info" | "warn" | "error">
{
  private static instance: Logger;
  private static _hidden = false;
  static get debug(): boolean {
    return Logger._hidden;
  }
  static set debug(value: boolean) {
    Logger._hidden = value;
  }
  constructor(private readonly logger: Console = window?.console) {
    if (!Logger.instance) {
      Logger.instance = this;
    }

    return Logger.instance;
  }

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
    if (Logger.debug) return;
    this.logger[method].apply(console, args);
  }
}
