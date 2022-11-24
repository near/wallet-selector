import React, { Fragment } from "react";
import type { WalletSelector } from "@near-wallet-selector/core";
import { ModalHeader } from "./ModalHeader";
import { BackArrow } from "./BackArrow";

interface WalletNetworkChangedProps {
  selector: WalletSelector;
  onBack: () => void;
  onCloseModal: () => void;
}

export const WalletNetworkChanged: React.FC<WalletNetworkChangedProps> = ({
  selector,
  onBack,
  onCloseModal,
}) => {
  return (
    <Fragment>
      <div className="nws-modal-header-wrapper">
        <BackArrow onClick={onBack} />
        <ModalHeader
          title="You Must Change the Network"
          onCloseModal={onCloseModal}
        />
      </div>
      <div className="switch-network-message-wrapper">
        <div className="content">
          <p>
            We've detected that you need to change your wallet's network to
            <strong className="network-id">{` ${selector.options.network.networkId}`}</strong>{" "}
            for this dApp.
          </p>
          <p>
            Some wallets may not support changing networks. If you can not
            change networks you may consider switching to another wallet.
          </p>
        </div>
      </div>
    </Fragment>
  );
};
