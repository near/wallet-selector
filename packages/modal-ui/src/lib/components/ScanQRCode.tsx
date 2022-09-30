import React from "react";
import { ModalHeader } from "./ModalHeader";
import QRCode from "qrcode";
import copy from "copy-to-clipboard";

interface ScanQRCodeProps {
  uri?: string;
  onCloseModal: () => void;
  handleOpenDefaultModal?: () => void;
}

async function formatQRCodeImage(data: string) {
  const dataString = await QRCode.toString(data, { margin: 0, type: "svg" });
  return dataString;
}

const ScanQRCode: React.FC<ScanQRCodeProps> = ({
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
      setNotification("Copied to clipboard");
      setInterval(() => setNotification(""), 1200);
    } else {
      setNotification("Error");
      setInterval(() => setNotification(""), 1200);
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
        title="Scan with Your Mobile Device"
        onCloseModal={onCloseModal}
      />

      <section className="qr-code">
        <div dangerouslySetInnerHTML={{ __html: svg }}></div>
        {notification ? (
          <div className="notification">{notification}</div>
        ) : (
          <div className="copy-btn" onClick={copyToClipboard}>
            Copy to clipboard
          </div>
        )}
      </section>
      <footer className="footer">
        <p>Prefer the official WalletConnect dialogue?</p>
        <button className="btn" onClick={handleOpenDefaultModal}>
          Open
        </button>
      </footer>
    </section>
  );
};

export default ScanQRCode;
