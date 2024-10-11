import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const HardwareWalletAccountsForm = ({ accounts, onSelectedChanged, onSubmit, onChangeRoute, }) => {
    return (_jsxs("div", { className: "choose-ledger-account-form-wrapper", children: [_jsxs("p", { children: ["We found ", accounts.length, " accounts on your device. Select the account(s) you wish to connect."] }), _jsx("div", { className: "button-wrapper", children: _jsx("button", { onClick: () => {
                        onChangeRoute("SpecifyHDPath");
                    }, children: "HD.../0" }) }), _jsx("form", { className: "form", onSubmit: (e) => {
                    onSubmit(accounts, e);
                }, children: _jsxs("div", { children: [_jsx("div", { className: "nws-form-control", children: accounts.map((account, index) => (_jsxs("div", { className: "account", children: [_jsx("input", { onChange: (e) => {
                                            onSelectedChanged(index, e.target.checked);
                                        }, checked: account.selected, type: "checkbox", id: account.accountId, name: account.accountId, value: account.accountId }), _jsxs("label", { htmlFor: account.accountId, children: [" ", account.accountId] }), _jsx("br", {})] }, index))) }), _jsx("div", { className: "action-buttons", children: _jsx("button", { className: "middleButton", type: "submit", disabled: !accounts.some((x) => x.selected), children: "Connect" }) })] }) })] }));
};
export default HardwareWalletAccountsForm;
