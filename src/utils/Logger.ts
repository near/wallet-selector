import { LogInterface } from "../interfaces/LogInterface";
import { MessageType } from "../types/MessageType"

export class Logger implements LogInterface {

  public doActive: boolean

  debug(msg: string, supportingData?: any[]) {
    this.emitLogMessage("debug", msg, supportingData);
  }
  info(msg: string, supportingData?: any[]) {
    this.emitLogMessage("info", msg, supportingData);
  }
  warn(msg: string, supportingData?: any[]): void {
    this.emitLogMessage("warn", msg, supportingData);
  }
  error(msg: string, supportingData?: any[]): void {
    this.emitLogMessage("error", msg, supportingData);
  }
  log(msg: string, supportingData?: any[]): void {
    this.emitLogMessage("log", msg, supportingData);
  }
  private emitLogMessage(
    msgType: MessageType,
    msg: string,
    supportingData?: any[]
  ){
    if(this.doActive){
      if(supportingData)
        console[msgType](msg, ...supportingData);
      else 
        console[msgType](msg)
      }
    }
}
