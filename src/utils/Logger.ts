import { EventEmitter } from 'events';

export class Logger {
  private logManager: EventEmitter;
  private minLevel: number;
  private module: string;
  private readonly levels: { [key: string]: number } = {
      'trace': 1,
      'debug': 2,
      'info': 3,
      'warn': 4,
      'error': 5
  };

  constructor(logManager: EventEmitter, module: string, minLevel: string) {
      this.logManager = logManager;
      this.module = module;
      this.minLevel = this.levelToInt(minLevel);
  }

  /**
   * Converts a string level (trace/debug/info/warn/error) into a number 
   * 
   * @param minLevel 
   */
  private levelToInt(minLevel: string): number {
      if (minLevel.toLowerCase() in this.levels)
          return this.levels[minLevel.toLowerCase()];
      else
          return 99;
  }

  /**
   * Central logging method.
   * @param logLevel 
   * @param message 
   */
  public log(logLevel: string, message: string): void {
      const level = this.levelToInt(logLevel);
      if (level < this.minLevel) return;

      const logEntry: LogEntry = { level: logLevel, module: this.module, message };

      // Obtain the line/file through a thoroughly hacky method
      // This creates a new stack trace and pulls the caller from it.  If the caller
      // if .trace()
      const error = new Error("");
      if (error.stack) {
          const cla = error.stack.split("\n");
          let idx = 1;
          while (idx < cla.length && cla[idx].includes("at Logger.Object.")) idx++;
          if (idx < cla.length) {
              logEntry.location = cla[idx].slice(cla[idx].indexOf("at ") + 3, cla[idx].length);
          }
      }

      this.logManager.emit('log', logEntry);
  }

  public trace(message: string): void { this.log('trace', message); }
  public debug(message: string): void { this.log('debug', message); }
  public info(message: string): void  { this.log('info', message); }
  public warn(message: string): void  { this.log('warn', message); }
  public error(message: string): void { this.log('error', message); }
}


export class LogManager extends EventEmitter {
  private options: LogOptions = {
    minLevels: {
      '': 'info'
    }
  };

  // Prevent the console logger from being added twice
  private consoleLoggerRegistered: boolean = false;

  public configure(options: LogOptions): LogManager {
    this.options = Object.assign({}, this.options, options);
    return this;
  }

  public registerConsoleLogger(): LogManager {
    if (this.consoleLoggerRegistered) return this;

    this.onLogEntry((logEntry) => {
        const msg = `${logEntry.location} [${logEntry.module}] ${logEntry.message}`;
        switch (logEntry.level) {
            case 'trace':
                console.trace(msg);
                break;
            case 'debug':
                console.debug(msg);
                break;
            case 'info':
                console.info(msg);
                break;
            case 'warn':
                console.warn(msg);
                break;
            case 'error':
                console.error(msg);
                break;
            default:
                console.log(`{${logEntry.level}} ${msg}`);
        }
    });

    this.consoleLoggerRegistered = true;
    return this;
}

  public getLogger(module: string): Logger {
    let minLevel = 'none';
    let match = '';

    for (const key in this.options.minLevels) {
      if (module.startsWith(key) && key.length >= match.length) {
        minLevel = this.options.minLevels[key];
        match = key;
      }
    }

    return new Logger(this, module, minLevel);
  }

  public onLogEntry(listener: (logEntry: LogEntry) => void): LogManager {
    this.on('log', listener);
    return this;
  }

  // public registerConsoleLogger()
}

export interface LogEntry {
  level: string;
  module: string;
  location?: string;
  message: string;
}

export interface LogOptions {
  minLevels: { [module: string]: string }
}

export const logging = new LogManager();