import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const LanguageSelector = ({ changeLanguage, }) => {
    return (_jsxs("div", { style: {
            background: "aliceblue",
            position: "fixed",
            top: 0,
        }, onChange: changeLanguage, children: [_jsx("input", { type: "radio", value: "en", name: "language", defaultChecked: true }), " English", _jsx("input", { type: "radio", value: "es", name: "language" }), " Spanish", _jsx("input", { type: "radio", value: "fr", name: "language" }), " French", _jsx("input", { type: "radio", value: "de", name: "language" }), " German", _jsx("input", { type: "radio", value: "bg", name: "language" }), " Bulgarian", _jsx("input", { type: "radio", value: "ko", name: "language" }), " Korean"] }));
};
