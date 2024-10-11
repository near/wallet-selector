import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import QRCode from "qrcode";
import copy from "copy-to-clipboard";
import { ModalHeader } from "./ModalHeader";
import { CopyIcon } from "./icons/CopyIcon";
import { translate } from "@near-wallet-selector/core";
async function formatQRCodeImage(data) {
    return await QRCode.toString(data, { margin: 0, type: "svg" });
}
export const ScanQRCode = ({ wallet, uri, onCloseModal, handleOpenDefaultModal, }) => {
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
        }
        else {
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
    return (_jsxs("section", { className: "scan-qr-code", children: [_jsx(ModalHeader, { title: translate("modal.qr.scanWithYourMobile"), onCloseModal: onCloseModal }), _jsxs("section", { className: "qr-code", children: [_jsx("div", { dangerouslySetInnerHTML: { __html: svg } }), notification ? (_jsx("div", { className: "notification", children: notification })) : (_jsxs("div", { className: "copy-btn", onClick: copyToClipboard, children: [_jsx(CopyIcon, {}), translate("modal.qr.copyToClipboard")] }))] }), _jsxs("footer", { className: "footer", children: [_jsxs("p", { children: [translate("modal.qr.preferTheOfficial"), " ", wallet.metadata.name, "?"] }), _jsx("button", { className: "btn", onClick: handleOpenDefaultModal, children: translate("modal.qr.open") })] })] }));
};
