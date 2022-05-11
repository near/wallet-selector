import { FunctionalComponent, h } from "@stencil/core";
import { ModuleState } from "@near-wallet-selector/core";
import appState from "../../../store";

interface WalletOptionsProps {
  onConnectHardwareWallet: () => void;
  onConnected: () => void;
  onError: (error: Error) => void;
}

export const WalletOptions: FunctionalComponent<WalletOptionsProps> = ({
  onConnectHardwareWallet,
  onConnected,
  onError,
}) => {
  if (appState.selector) {
    const subscription = appState.selector.store.observable.subscribe(
      (state) => {
        appState.walletOptionsModules = state.modules;
      }
    );
    subscription.unsubscribe();
  }

  const handleWalletClick = (module: ModuleState) => async () => {
    if (appState.walletOptionsConnecting) {
      return;
    }

    try {
      appState.walletOptionsConnecting = true;
      const wallet = await module.wallet();

      if (wallet.type === "hardware") {
        return onConnectHardwareWallet();
      }

      await wallet.connect();
      onConnected();
    } catch (err) {
      const { name } = module.metadata;

      const message =
        err instanceof Error ? err.message : "Something went wrong";

      onError(new Error(`Failed to connect with ${name}: ${message}`));
    } finally {
      appState.walletOptionsConnecting = false;
    }
  };
  return (
    <div>
      <div class="wallet-options-wrapper">
        <p class="description">
          Please select a wallet to connect to this dApp:
        </p>
        <ul
          class={
            "options-list " +
            (appState.walletOptionsConnecting ? "selection-process" : "")
          }
        >
          {appState.walletOptionsModules.reduce((result, module) => {
            const { selectedWalletId } = appState.selector.store.getState();
            const { name, description, iconUrl } = module.metadata;
            const selected = module.id === selectedWalletId;

            result.push(
              <li
                key={module.id}
                id={module.id}
                class={selected ? "selected-wallet" : ""}
                onClick={selected ? undefined : handleWalletClick(module)}
              >
                <div title={description || ""}>
                  <img src={iconUrl} alt={name} />
                  <div>
                    <span>{name}</span>
                  </div>
                  {selected && (
                    <div class="selected-wallet-text">
                      <span>selected</span>
                    </div>
                  )}
                </div>
              </li>
            );

            return result;
          }, [])}
        </ul>
      </div>
      <div class="info">
        <span
          onClick={() => {
            appState.walletInfoVisible = !appState.walletInfoVisible;
          }}
        >
          What is a Wallet?
        </span>
        <div
          class={`info-description ${
            appState.walletInfoVisible ? "show" : "hide"
          }-explanation`}
        >
          <p>
            Wallets are used to send, receive and store digital assets. There
            are different types of wallets. They can be an extension added to
            your browser, a hardware device plugged into your computer,
            web-based or an app on your mobile device.
          </p>
        </div>
      </div>
    </div>
  );
};
