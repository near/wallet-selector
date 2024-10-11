import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import { ModalHeader } from "./ModalHeader";
import { BackArrow } from "./BackArrow";
export const WalletNetworkChanged = ({ selector, onBack, onCloseModal, }) => {
    return (_jsxs(Fragment, { children: [_jsxs("div", { className: "nws-modal-header-wrapper", children: [_jsx(BackArrow, { onClick: onBack }), _jsx(ModalHeader, { title: "You Must Change the Network", onCloseModal: onCloseModal })] }), _jsx("div", { className: "switch-network-message-wrapper", children: _jsxs("div", { className: "content", children: [_jsxs("p", { children: ["We've detected that you need to change your wallet's network to", _jsx("strong", { className: "network-id", children: ` ${selector.options.network.networkId}` }), " ", "for this dApp."] }), _jsx("p", { children: "Some wallets may not support changing networks. If you can not change networks you may consider switching to another wallet." })] }) })] }));
};
