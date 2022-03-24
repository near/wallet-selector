import { NetworkId } from "./interfaces/Options";
export interface NetworkConfiguration {
    networkId: NetworkId;
    nodeUrl: string;
    walletUrl: string;
    helperUrl: string;
}
declare const getConfig: (networkId: NetworkId) => NetworkConfiguration;
export default getConfig;
