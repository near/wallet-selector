import { jsx as _jsx } from "react/jsx-runtime";
import { CloseIcon } from "./icons/CloseIcon";
export const CloseButton = ({ onClick }) => {
    return (_jsx("button", { onClick: onClick, className: "close-button", children: _jsx(CloseIcon, {}) }));
};
