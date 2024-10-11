"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScanQRCode = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const qrcode_1 = __importDefault(require("qrcode"));
const copy_to_clipboard_1 = __importDefault(require("copy-to-clipboard"));
const ModalHeader_1 = require("./ModalHeader");
const CopyIcon_1 = require("./icons/CopyIcon");
const core_1 = require("@near-wallet-selector/core");
async function formatQRCodeImage(data) {
    return await qrcode_1.default.toString(data, { margin: 0, type: "svg" });
}
const ScanQRCode = ({ wallet, uri, onCloseModal, handleOpenDefaultModal, }) => {
    const [notification, setNotification] = react_1.default.useState("");
    const [svg, setSvg] = react_1.default.useState("");
    const copyToClipboard = () => {
        if (!uri) {
            return;
        }
        const success = (0, copy_to_clipboard_1.default)(uri);
        if (success) {
            setNotification((0, core_1.translate)("modal.qr.copiedToClipboard"));
            setTimeout(() => setNotification(""), 1200);
        }
        else {
            setNotification((0, core_1.translate)("modal.qr.failedToCopy"));
            setTimeout(() => setNotification(""), 1200);
        }
    };
    react_1.default.useEffect(() => {
        (async () => {
            if (uri) {
                setSvg(await formatQRCodeImage(uri));
            }
        })();
    }, [uri]);
    return ((0, jsx_runtime_1.jsxs)("section", { className: "scan-qr-code", children: [(0, jsx_runtime_1.jsx)(ModalHeader_1.ModalHeader, { title: (0, core_1.translate)("modal.qr.scanWithYourMobile"), onCloseModal: onCloseModal }), (0, jsx_runtime_1.jsxs)("section", { className: "qr-code", children: [(0, jsx_runtime_1.jsx)("div", { dangerouslySetInnerHTML: { __html: svg } }), notification ? ((0, jsx_runtime_1.jsx)("div", { className: "notification", children: notification })) : ((0, jsx_runtime_1.jsxs)("div", { className: "copy-btn", onClick: copyToClipboard, children: [(0, jsx_runtime_1.jsx)(CopyIcon_1.CopyIcon, {}), (0, core_1.translate)("modal.qr.copyToClipboard")] }))] }), (0, jsx_runtime_1.jsxs)("footer", { className: "footer", children: [(0, jsx_runtime_1.jsxs)("p", { children: [(0, core_1.translate)("modal.qr.preferTheOfficial"), " ", wallet.metadata.name, "?"] }), (0, jsx_runtime_1.jsx)("button", { className: "btn", onClick: handleOpenDefaultModal, children: (0, core_1.translate)("modal.qr.open") })] })] }));
};
exports.ScanQRCode = ScanQRCode;
