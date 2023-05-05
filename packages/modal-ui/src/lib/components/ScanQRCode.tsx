import React from "react";
import QRCode from "qrcode";
import copy from "copy-to-clipboard";
import { ModalHeader } from "./ModalHeader";
import { CopyIcon } from "./icons/CopyIcon";
import { translate } from "@near-wallet-selector/core";
import type { ModuleState, Wallet } from "@near-wallet-selector/core";

interface ScanQRCodeProps {
  wallet: ModuleState<Wallet>;
  uri?: string;
  onCloseModal: () => void;
  handleOpenDefaultModal?: () => void;
}

async function formatQRCodeImage(data: string) {
  return await QRCode.toString(data, { margin: 0, type: "svg" });
}

export const ScanQRCode: React.FC<ScanQRCodeProps> = ({
  wallet,
  uri,
  onCloseModal,
  handleOpenDefaultModal,
}) => {
  const [notification, setNotification] = React.useState("");
  const [svg, setSvg] = React.useState("");

  const copyToClipboard = () => {
    if (!uri) {
      return;
    }
    const success = copy(uri);
    if (success) {
      setNotification(translate("modal.qr.copiedToClipboard"));
      setTimeout(() => setNotification(""), 1200);
    } else {
      setNotification(translate("modal.qr.failedToCopy"));
      setTimeout(() => setNotification(""), 1200);
    }
  };

  React.useEffect(() => {
    (async () => {
      if (uri) {
        setSvg(await formatQRCodeImage(uri));
      }
    })();
  }, [uri]);

  return (
    <section className="scan-qr-code">
      <ModalHeader
        title={translate("modal.qr.scanWithYourMobile")}
        onCloseModal={onCloseModal}
      />

      <section className="qr-code">
        <div dangerouslySetInnerHTML={{ __html: svg }}></div>
        {notification ? (
          <div className="notification">{notification}</div>
        ) : (
          <div className="copy-btn" onClick={copyToClipboard}>
            <CopyIcon />
            {translate("modal.qr.copyToClipboard")}
          </div>
        )}
      </section>
      <footer className="footer">
        <p>
          {translate("modal.qr.preferTheOfficial")} {wallet.metadata.name}?
        </p>
        <button className="btn" onClick={handleOpenDefaultModal}>
          {translate("modal.qr.open")}
        </button>
      </footer>
    </section>
  );
};
