import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import { ConnectionResult } from "./ConnectionResult";
import { ModalHeader } from "./ModalHeader";
export const AlertMessage = ({ message, module, onBack, onCloseModal, }) => {
    return (_jsxs(Fragment, { children: [_jsx(ModalHeader, { title: "", onCloseModal: onCloseModal }), _jsx("div", { className: "alert-message connecting-wrapper connecting-wrapper-err", children: _jsxs("div", { className: "content", children: [_jsx("div", { className: "icon", children: _jsx("img", { src: module?.metadata.iconUrl, alt: module?.metadata.name }) }), _jsx("h3", { className: "connecting-name", children: module?.metadata.name }), _jsx(ConnectionResult, { module: module, message: message, err: message !== null, onRetry: () => {
                                onBack(true);
                            } })] }) })] }));
};
