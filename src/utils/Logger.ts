import { LogInterface } from "../interfaces/LogInterface";

export class Logger implements LogInterface {
  public debug(msg: string, ...supportingData: any[]): void {
    this.emitLogMessage("debug", msg, supportingData);
  }
  public info(msg: string, ...supportingData: any[]): void {
    this.emitLogMessage("info", msg, supportingData);
  }
  public warn(msg: string, ...supportingData: any[]): void {
    this.emitLogMessage("warn", msg, supportingData);
  }
  public error(msg: string, ...supportingData: any[]): void {
    this.emitLogMessage("error", msg, supportingData);
  }
  public log(msg: string, ...supportingData: any[]): void {
    this.emitLogMessage("log", msg, supportingData);
  }
  private emitLogMessage(
    msgType: "debug" | "info" | "warn" | "error" | "log",
    msg: string,
    supportingData: any[]
  ) {
    if (supportingData.length > 0) {
      console[msgType](msg, supportingData);
    } else {
      console[msgType](msg);
    }
  }
}
