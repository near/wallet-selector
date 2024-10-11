import { jsx as _jsx } from "react/jsx-runtime";
import { BackArrowIcon } from "./icons/BackArrowIcon";
export const BackArrow = ({ onClick }) => {
    return (_jsx("button", { onClick: onClick, className: "back-button", children: _jsx(BackArrowIcon, {}) }));
};
