export interface LogInterface {
  debug(primaryMesasge: string, ...supportingData: any[]): void;
  warn(primaryMesasge: string, ...supportingData: any[]): void;
  error(primaryMesasge: string, ...supportingData: any[]): void;
  info(primaryMesasge: string, ...supportingData: any[]): void;
}
