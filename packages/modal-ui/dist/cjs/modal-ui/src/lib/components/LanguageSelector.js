"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageSelector = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const LanguageSelector = ({ changeLanguage, }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            background: "aliceblue",
            position: "fixed",
            top: 0,
        }, onChange: changeLanguage, children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", value: "en", name: "language", defaultChecked: true }), " English", (0, jsx_runtime_1.jsx)("input", { type: "radio", value: "es", name: "language" }), " Spanish", (0, jsx_runtime_1.jsx)("input", { type: "radio", value: "fr", name: "language" }), " French", (0, jsx_runtime_1.jsx)("input", { type: "radio", value: "de", name: "language" }), " German", (0, jsx_runtime_1.jsx)("input", { type: "radio", value: "bg", name: "language" }), " Bulgarian", (0, jsx_runtime_1.jsx)("input", { type: "radio", value: "ko", name: "language" }), " Korean"] }));
};
exports.LanguageSelector = LanguageSelector;
