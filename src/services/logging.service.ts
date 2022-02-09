export class Logger implements Pick<Console, 'log' | 'info' | 'warn' | 'error'> {
  private static instances = new Map<boolean, Logger>();

  constructor(
    private readonly logger: Console = window?.console,
    private readonly hidden: boolean = false
  ) {
    if (!Logger.instances.has(hidden)) {
      Logger.instances.set(hidden, this);
    }
    return Logger.instances.get(hidden)!;
  }

  log(...params: any[]): void {
    this.trigger("log", ...params);
  }

  error(...params: any[]): void {
    this.trigger("error", ...params);
  }

  info(...params: any[]): void {
    this.trigger("info", ...params);
  }

  warn(...params: any[]): void {
    this.trigger("warn", ...params);
  }

  private trigger(method: keyof Console, ...args: any[]) {
    if (this.hidden) return;
    this.logger[method].apply(console, args);
  }
}
