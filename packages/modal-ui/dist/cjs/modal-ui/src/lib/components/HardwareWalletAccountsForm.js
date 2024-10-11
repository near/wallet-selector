"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const HardwareWalletAccountsForm = ({ accounts, onSelectedChanged, onSubmit, onChangeRoute, }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "choose-ledger-account-form-wrapper", children: [(0, jsx_runtime_1.jsxs)("p", { children: ["We found ", accounts.length, " accounts on your device. Select the account(s) you wish to connect."] }), (0, jsx_runtime_1.jsx)("div", { className: "button-wrapper", children: (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                        onChangeRoute("SpecifyHDPath");
                    }, children: "HD.../0" }) }), (0, jsx_runtime_1.jsx)("form", { className: "form", onSubmit: (e) => {
                    onSubmit(accounts, e);
                }, children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "nws-form-control", children: accounts.map((account, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "account", children: [(0, jsx_runtime_1.jsx)("input", { onChange: (e) => {
                                            onSelectedChanged(index, e.target.checked);
                                        }, checked: account.selected, type: "checkbox", id: account.accountId, name: account.accountId, value: account.accountId }), (0, jsx_runtime_1.jsxs)("label", { htmlFor: account.accountId, children: [" ", account.accountId] }), (0, jsx_runtime_1.jsx)("br", {})] }, index))) }), (0, jsx_runtime_1.jsx)("div", { className: "action-buttons", children: (0, jsx_runtime_1.jsx)("button", { className: "middleButton", type: "submit", disabled: !accounts.some((x) => x.selected), children: "Connect" }) })] }) })] }));
};
exports.default = HardwareWalletAccountsForm;
