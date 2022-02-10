import IWallet, { CallParams } from "../../interfaces/IWallet";
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import createLedgerClient from "../../utils/ledgerClient";
import { Emitter } from "../../utils/EventsHandler";
import ProviderService from "../../services/provider/ProviderService";
import BaseWallet from "../BaseWallet";
import { getState } from "../../state/State";
import { TypedError } from "near-api-js/lib/utils/errors";

class LedgerWalletV2 extends BaseWallet implements IWallet {
  client: ReturnType<typeof createLedgerClient>;

  private accountId = "lewis-sqa.testnet";
  private derivationPath = "44'/397'/0'/0'/1'";

  constructor(emitter: Emitter, provider: ProviderService) {
    super(emitter, provider);
  }

  getInfo() {
    return {
      id: "ledgerwallet",
      name: "Ledger Wallet",
      description: "Ledger Wallet",
      iconUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAYFBMVEX///8zN0aZm6Jwc305PUtiZXGvsbbi4uSmp67n5+m+v8Q1OUdFSVb6+vr19fY+QlDt7e56fYbT1NdTVmPHyMyGiJFqbXdbXmlWWWWgoah7foeSlJx1eIJLT1yztbrw8fKmGsZBAAACeklEQVR4nO3d2XKCMBhAYSIUAUEQt9b1/d+yetPaGshMlp+0nnMN0k8lUGZMkoSIiIiIiIiIiIiIXr6mK+cP6Ta5zp0ruyYkostXa/WjTLfZTPnonBbat8m9ard4OlpAyL19vvTPWOuOFBiiVF34/Y6VO/1xgkOUeu89Oqp24CgCELX48Ob4GDyIBESpg6ev13H4EDIQlXqRDH8eYhB18uCoxg4gBVEzZ0c5dJ7LQtTGFTIw7opDzo6XxtEvliREHd0g2uv5JJCsc3EYPhBJiNv5Pn6GyEJqh4tJ93y/Ox3EZeDKTa8tCtnaQ1ZRQdb2EMOYJQxR1peSxvjSshDr/0yukUEqW0gZGeRiC5lHBsmBAAECBAgQIEBukMxU+zcglgEBAgQIECBAgAABAgQIECBAAkOuM2N/A/J/HgcBAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIC8GKRLTWl/MH8x7maZ80/BiYiIiIiIiCiuyjdTO91uuXE37exlW+Nu1hO8BHsclOp2ewv3OAgIECBAgAAB8p8gweags4RYz0HXRQaxvmkMNk+jJcR+Bvk6Loj9jL9pVJDa2pEUUUFW9hDj+CsKsR60bu0jgrQu85SbZi6WhDjMW3wbgA3jliBk4bY+jOF0F4QcnBxJ8x4JpC3dIEk/OlG5HMT9R/ljq3bIQXys2zE2VbkUZO9j9aRm5EZFCLJ2WlfhW3KaGLL347j/aUNnvAjk5HFVrs15MkjrdxKR5TGbBLI4uF4/nuqOmtuVwJBsG2Tdumaz/b3YQkhIvbr4X7Luq2Vf5cVDum36wpT2KUL1sEFe9d5GKiIiIiIiIiIiIqKX6xNYBUsKTAn7+wAAAABJRU5ErkJggg==",
    };
  }

  async init() {
    // Ledger device: UNKNOWN_ERROR (0x6e01) = not opened the NEAR app.
    const transport = await TransportWebHID.create();

    this.client = createLedgerClient(transport);
  }

  async signIn() {
    throw new Error("Not implemented");
  }

  async disconnect() {
    throw new Error("Not implemented");
  }

  async isConnected() {
    return true;
  }

  async validate(accountId: string, derivationPath: string) {
    console.log("LedgerWalletV2:validate", { accountId, derivationPath });

    const publicKey = await this.client.getPublicKey(derivationPath);

    console.log("LedgerWalletV2:validate:publicKey", publicKey.toString());

    try {
      const accessKey = await this.provider.viewAccessKey({
        accountId,
        publicKey: publicKey.toString(),
      });

      console.log("LedgerWalletV2:validate:key", accessKey);
    } catch (err) {
      if (err instanceof TypedError) {
        if (err.type === "AccessKeyDoesNotExist") {
          const ok = confirm(
            "This public key is not registered with your NEAR account. Would you like to add it?"
          );

          if (ok) {
            const state = getState();

            window.location.href = `https://wallet.testnet.near.org/login/?success_url=http%3A%2F%2Flocalhost%3A1234%2F&failure_url=http%3A%2F%2Flocalhost%3A1234%2F&contract_id=${state.options.accountId}&public_key=${publicKey}`;
          }

          return;
        }
      }

      throw err;
    }
  }

  async walletSelected() {
    await this.init();
    await this.validate(this.accountId, this.derivationPath);
    await this.setWalletAsSignedIn();
  }

  async getAccount() {
    const connected = await this.isConnected();

    if (!connected) {
      return null;
    }

    const accountId = this.accountId;
    const account = await this.provider.viewAccount({ accountId });

    return {
      accountId,
      balance: account.amount,
    };
  }

  async call({ receiverId, actions }: CallParams) {
    console.log("LedgerWalletV2:call", { receiverId, actions });
  }
}

export default LedgerWalletV2;
