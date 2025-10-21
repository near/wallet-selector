import React from "react";
import QRCode from "qrcode";
import copy from "copy-to-clipboard";
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
      <section className="qr-code">
        <img src={wallet?.metadata.iconUrl} alt={wallet?.metadata.name} />
        <div dangerouslySetInnerHTML={{ __html: svg }}></div>
        <p>{`Please scan this QR code\n to connect your wallet.`}</p>
        <p>
          <span className="copy-to-clipboard" onClick={copyToClipboard}>
            {notification
              ? notification
              : translate("modal.qr.copyToClipboard")}
          </span>{" "}
          or{" "}
          <span
            className="open-in-official-dialogue"
            onClick={handleOpenDefaultModal}
          >
            open in official dialogue
          </span>
        </p>
      </section>
    </section>
  );
};
