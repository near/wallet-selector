export declare const modalStyles = "\n  .ethereum-wallet-modal *,\n  .ethereum-wallet-modal *::before,\n  .ethereum-wallet-modal *::after {\n    box-sizing: border-box;\n  }\n  .ethereum-wallet-modal button {\n    cursor: pointer;\n    top: auto;\n  }\n  .ethereum-wallet-modal button:hover {\n    top: auto;\n  }\n  .ethereum-wallet-modal button:focus-visible {\n    top: auto;\n  }\n\n  .ethereum-wallet-modal dt {\n    flex-shrink: 0;\n    margin: 0;\n    font-size: 14px;\n    line-height: 20px;\n    color: #202020;\n    font-weight: 500;\n  }\n  .ethereum-wallet-modal dd {\n    margin: 0;\n    font-size: 14px;\n    line-height: 20px;\n    color: #202020;\n    font-weight: 700;\n    text-align: right;\n    word-break: break-all;\n    overflow-wrap: break-word;\n  }\n\n  .ethereum-wallet-modal {\n    display: none;\n    position: relative;\n    z-index: 9999;\n  }\n  .ethereum-wallet-modal-backdrop {\n    position: fixed;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    background-color: rgba(0, 0, 0, 0.5);\n  }\n  .ethereum-wallet-modal-wrapper {\n    position: fixed;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    width: 100vw;\n    overflow-y: auto;\n  }\n  .ethereum-wallet-modal-container {\n    display: flex;\n    min-height: 100%;\n    align-items: center;\n    justify-content: center;\n    padding: 1rem;\n    text-align: center;\n  }\n  .ethereum-wallet-modal-content {\n    position: relative;\n    overflow: hidden;\n    border-radius: 1rem;\n    background-color: #fff;\n    padding: 20px;\n    text-align: left;\n    max-width: 400px;\n    width: 100%;\n    box-shadow:\n      0px 4px 8px rgba(0, 0, 0, 0.06),\n      0px 0px 0px 1px rgba(0, 0, 0, 0.06);\n  }\n\n  .ethereum-wallet-modal h2 {\n    font-weight: 700;\n    font-size: 24px;\n    line-height: 30px;\n    text-align: center;\n    letter-spacing: -0.1px;\n    color: #202020;\n    margin: 0;\n  }\n\n  .ethereum-wallet-txs {\n    margin: 20px 0 10px 0;\n    display: flex;\n    flex-direction: column;\n    row-gap: 8px;\n  }\n\n  .ethereum-wallet-tx {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n  .ethereum-wallet-tx:not(.ethereum-wallet-tx-single) {\n    padding: 0 10px;\n  }\n  .ethereum-wallet-tx-list-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 12px 10px;\n    width: 100%;\n  }\n  .ethereum-wallet-tx-list-header p {\n    margin: 0;\n    font-size: 14px;\n    line-height: 20px;\n    color: #202020;\n    font-weight: 700;\n  }\n  .ethereum-wallet-tx-list-header svg {\n    height: 24px;\n    width: 24px;\n  }\n\n  .ethereum-wallet-tx-explorer-link {\n    height: 24px;\n    width: 24px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 6px;\n  }\n  .ethereum-wallet-tx-explorer-link:hover {\n    background-color: #DDF3E4;\n  }\n  .ethereum-wallet-tx-explorer-link svg {\n    height: 16px;\n    width: 16px;\n    color: #202020;\n  }\n\n  .ethereum-wallet-tx.ethereum-wallet-tx-signing {\n    background-color: #F9F9F9;\n    padding-bottom: 10px;\n    border-radius: 8px;\n  }\n  .ethereum-wallet-tx.ethereum-wallet-tx-pending {\n    background-color: #F9F9F9;\n    border-radius: 8px;\n  }\n  .ethereum-wallet-tx.ethereum-wallet-tx-completed {\n    background-color: #F2FCF5;\n    border-radius: 8px;\n  }\n\n  .ethereum-wallet-tx-single .ethereum-wallet-tx-info-container {\n    border-top: 1px solid #EBEBEB;\n    border-bottom: 1px solid #EBEBEB;\n  }\n  .ethereum-wallet-tx-info-text > p {\n    color: #646464;\n    margin: 0;\n    font-weight: 500;\n    font-size: 12px;\n    line-height: 16px;\n    letter-spacing: 0.04px;\n  }\n  .ethereum-wallet-tx-info-text > p:not(:last-child) {\n    margin-bottom: 8px;\n  }\n\n  .ethereum-wallet-tx-info-row {\n    padding: 14px 10px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    column-gap: 20px;\n  }\n  .ethereum-wallet-tx-info-col {\n    padding: 14px 10px;\n    display: flex;\n    flex-direction: column;\n    justify-content: start;\n    row-gap: 4px;\n    align-items: start;\n  }\n  .ethereum-wallet-tx-info-text {\n    padding: 10px;\n  }\n  .ethereum-wallet-tx-params,\n  .ethereum-wallet-tx-params dl {\n    margin: 0;\n  }\n  .ethereum-wallet-tx .ethereum-wallet-tx-params {\n    border-top: 1px solid #EBEBEB;\n    border-bottom: 1px solid #EBEBEB;\n  }\n  .ethereum-wallet-tx-params div:not(:last-child) {\n    border-bottom: 1px solid #EBEBEB;\n  }\n\n  .ethereum-wallet-btn {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 8px;\n    color: #1C2024;\n    border: 1px solid rgba(1, 6, 47, 0.173) !important;\n    background-color: #fff !important;\n    padding: 14px;\n    font-size: 14px;\n    line-height: 20px;\n    font-weight: 700;\n  }\n  .ethereum-wallet-btn:hover {\n    border: 1px solid rgba(1, 6, 47, 0.173);\n    background-color: #F2F2F5 !important;\n  }\n  .ethereum-wallet-btn:focus-visible {\n    outline: 2px solid;\n    outline-offset: 2px;\n    outline-color: #8B8D98;\n    border: 1px solid rgba(1, 6, 47, 0.173);\n  }\n  .ethereum-wallet-btn-sm {\n    padding: 10px 14px;\n    font-size: 12px;\n    line-height: 16px;\n  }\n  .ethereum-wallet-btn-xs {\n    padding: 8px 12px;\n    font-weight: 500;\n    font-size: 12px;\n    line-height: 16px;\n    letter-spacing: 0.04px;\n    border-radius: 9999px;\n  }\n  .ethereum-wallet-btn-confirm {\n    width: 100%;\n    margin-top: 24px;\n  }\n  .ethereum-wallet-btn-cancel {\n    width: 100%;\n    background-color: #FFF9F9 !important;\n    color: #dc2626 !important;\n    border: 1px solid #fecaca !important;\n  }\n  .ethereum-wallet-btn-cancel:hover {\n    background-color: #fef2f2 !important;\n  }\n  .ethereum-wallet-btn-details {\n    margin-top: 20px;\n    border-radius: 9999px;\n  }\n\n  .ethereum-wallet-tx-error {\n    font-size: 14px;\n    line-height: 20px;\n    color: #dc2626;\n    font-weight: 700;\n    text-align: center;\n    text-wrap: balance;\n    margin-top: 20px;\n    margin-bottom: 0px;\n  }\n\n  .ethereum-wallet-txs-details {\n    display: none;\n    margin-top: 10px;\n    padding: 10px;\n    background: #F1F1F1;\n    border-radius: 8px;\n    width: 100%;\n    max-width: 100%;\n    overflow: auto;\n  }\n  .ethereum-wallet-txs-details p {\n    font-weight: 500;\n    font-size: 12px;\n    line-height: 16px;\n    letter-spacing: 0.04px;\n    color: #646464;\n    word-wrap: break-word;\n    overflow-wrap: break-word;\n    white-space: pre-wrap;\n    margin: 0;\n  }\n\n  .ethereum-wallet-txs-status {\n    position: relative;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 14px;\n    background: #F1F4FE;\n    border-radius: 8px;\n    width: 100%;\n    margin-top: 24px;\n    border: 1px solid rgba(0,0,0,0);\n  }\n  .ethereum-wallet-txs-status p {\n    margin: 0;\n    color: #384EAC;\n    font-weight: 700;\n    font-size: 14px;\n    line-height: 20px;\n  }\n\n  .ethereum-wallet-tx-highlight {\n    position: relative;\n    z-index: 1;\n  }\n  .ethereum-wallet-tx-highlight::before {\n    content: \"\";\n    position: absolute;\n    top: -4px;\n    left: -6px;\n    right: -6px;\n    bottom: -4px;\n    z-index: -1;\n    background-color: #DDF3E4;\n    border-radius: 8px;\n  }\n\n  .ethereum-wallet-spinner {\n    position: absolute;\n    right: 14px;\n    top: 16px;\n    width: 16px;\n    height: 16px;\n    border: 2px solid #384EAC;\n    border-bottom-color: transparent;\n    border-radius: 50%;\n    animation: rotation 1s linear infinite;\n  }\n  @keyframes rotation {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n  }\n";
//# sourceMappingURL=styles.d.ts.map