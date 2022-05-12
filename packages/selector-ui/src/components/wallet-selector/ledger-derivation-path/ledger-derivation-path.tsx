import { FunctionalComponent, h } from "@stencil/core";
import appState from "../../../store";

interface LedgerDerivationPathProps {
  onBack: () => void;
  onConnected: () => void;
}

export const LedgerDerivationPath: FunctionalComponent<
  LedgerDerivationPathProps
> = ({ onBack, onConnected }) => {
  const resetState = () => {
    appState.ledgerIsLoading = false;
    appState.ledgerError = "";
  };

  const handleDerivationPathChange = (e) => {
    appState.ledgerDerivationPaths = [e.target.value];
  };

  const handleConnectClick = async () => {
    appState.ledgerIsLoading = true;
    // TODO: Can't assume "ledger" once we implement more hardware wallets.
    const wallet = await appState.selector.wallet("ledger");

    if (wallet.type !== "hardware") {
      return;
    }

    appState.ledgerIsLoading = true;
    console.log(appState.ledgerDerivationPaths[0]);
    return wallet
      .connect({ derivationPaths: [appState.ledgerDerivationPaths[0]] })
      .then(() => {
        onConnected();
        resetState();
        appState.walletOptionsConnecting = false;
      })
      .catch((err) => (appState.ledgerError = `Error: ${err.message}`))
      .finally(() => (appState.ledgerIsLoading = false));
  };

  const handleEnterClick = async (e) => {
    if (e.key === "Enter") {
      await handleConnectClick();
    }
  };

  return (
    <div class="ledger-derivation-path-wrapper">
      <p>
        Make sure your Ledger is plugged in, then enter an account id to
        connect:
      </p>
      <div class="derivation-path-list">
        <input
          type="text"
          class={appState.ledgerError ? "input-error" : ""}
          placeholder="Derivation Path"
          value={appState.ledgerDerivationPaths[0]}
          onChange={handleDerivationPathChange}
          readOnly={appState.ledgerIsLoading}
          onKeyPress={handleEnterClick}
        />
        {appState.ledgerError && <p class="error">{appState.ledgerError}</p>}
      </div>
      <div class="action-buttons">
        <button
          class="left-button"
          disabled={appState.ledgerIsLoading}
          onClick={() => {
            onBack();
            resetState();
          }}
        >
          Back
        </button>
        <button
          class="right-button"
          onClick={async () => {
            await handleConnectClick();
          }}
          disabled={appState.ledgerIsLoading}
        >
          {appState.ledgerIsLoading ? "Connecting..." : "Connect"}
        </button>
      </div>
    </div>
  );
};
