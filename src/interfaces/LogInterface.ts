export interface LogInterface {
  debug(msg: string, supportingData?: any[]): void;
  warn(msg: string, supportingData?: any[]): void;
  error(msg: string, supportingData?: any[]): void;
  info(msg: string, supportingData?: any[]): void;
}
