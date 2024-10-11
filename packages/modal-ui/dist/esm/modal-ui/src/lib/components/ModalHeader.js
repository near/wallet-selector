import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CloseButton } from "./CloseButton";
export const ModalHeader = ({ title, onCloseModal, }) => {
    const additionalClasses = title === "Get a Wallet" ? " -open" : "";
    return (_jsxs("div", { className: "nws-modal-header", children: [_jsx("h3", { className: `middleTitle ${additionalClasses}`, children: title }), _jsx(CloseButton, { onClick: onCloseModal })] }));
};
