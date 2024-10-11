"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
const providers_1 = require("@near-js/providers");
class Provider {
    /*
    private provider: JsonRpcProvider;
  
    constructor(urls: Array<string>) {
      this.provider = new JsonRpcProvider(
        this.urlsToProviders(urls)
      );
    }
     */
    provider;
    constructor(urls) {
        this.provider = new providers_1.FailoverRpcProvider(this.urlsToProviders(urls));
    }
    query(paramsOrPath, data) {
        if (typeof paramsOrPath === "string" && data !== undefined) {
            return this.provider.query(paramsOrPath, data);
        }
        else {
            return this.provider.query(paramsOrPath);
        }
    }
    viewAccessKey({ accountId, publicKey }) {
        return this.query({
            request_type: "view_access_key",
            finality: "final",
            account_id: accountId,
            public_key: publicKey,
        });
    }
    block(reference) {
        return this.provider.block(reference);
    }
    sendTransaction(signedTransaction) {
        return this.provider.sendTransaction(signedTransaction);
    }
    urlsToProviders(urls) {
        return urls && urls.length > 0
            ? urls.map((url) => new providers_1.JsonRpcProvider({ url }))
            : [];
    }
}
exports.Provider = Provider;
