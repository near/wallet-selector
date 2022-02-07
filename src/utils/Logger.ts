import { LogInterface } from "../interfaces/LogInterface";
import MessageType from "../types/MessageType";

export class Logger implements LogInterface {
  public doActive: boolean;

  debug(msg: string, ...supportingData: unknown[]) {
    this.emitLogMessage("debug", msg, supportingData);
  }
  info(msg: string, ...supportingData: unknown[]) {
    this.emitLogMessage("info", msg, supportingData);
  }
  warn(msg: string, ...supportingData: unknown[]) {
    this.emitLogMessage("warn", msg, supportingData);
  }
  error(msg: string, ...supportingData: unknown[]) {
    this.emitLogMessage("error", msg, supportingData);
  }
  log(msg: string, ...supportingData: unknown[]) {
    this.emitLogMessage("log", msg, supportingData);
  }
  private emitLogMessage(
    msgType: MessageType,
    msg: string,
    supportingData?: unknown[]
  ) {
    if (this.doActive) {
      if (supportingData) console[msgType](msg, ...supportingData);
      else console[msgType](msg);
    }
  }
}
