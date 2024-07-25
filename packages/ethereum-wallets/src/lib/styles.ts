export const modalStyles = `
  .ethereum-wallet-modal *,
  .ethereum-wallet-modal *::before,
  .ethereum-wallet-modal *::after {
    box-sizing: border-box;
  }
  .ethereum-wallet-modal button {
    cursor: pointer;
    top: auto;
  }
  .ethereum-wallet-modal button:hover {
    top: auto;
  }
  .ethereum-wallet-modal button:focus-visible {
    top: auto;
  }

  .ethereum-wallet-modal dt {
    flex-shrink: 0;
    margin: 0;
    font-size: 14px;
    line-height: 20px;
    color: #202020;
    font-weight: 500;
  }
  .ethereum-wallet-modal dd {
    margin: 0;
    font-size: 14px;
    line-height: 20px;
    color: #202020;
    font-weight: 700;
    text-align: right;
    word-break: break-all;
    overflow-wrap: break-word;
  }

  .ethereum-wallet-modal {
    display: none;
    position: relative;
    z-index: 9999;
  }
  .ethereum-wallet-modal-backdrop {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .ethereum-wallet-modal-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100vw;
    overflow-y: auto;
  }
  .ethereum-wallet-modal-container {
    display: flex;
    min-height: 100%;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    text-align: center;
  }
  .ethereum-wallet-modal-content {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    background-color: #fff;
    padding: 20px;
    text-align: left;
    max-width: 400px;
    width: 100%;
    box-shadow:
      0px 4px 8px rgba(0, 0, 0, 0.06),
      0px 0px 0px 1px rgba(0, 0, 0, 0.06);
  }

  .ethereum-wallet-modal h2 {
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    letter-spacing: -0.1px;
    color: #202020;
    margin: 0;
  }

  .ethereum-wallet-txs {
    margin: 20px 0 10px 0;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }

  .ethereum-wallet-tx {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .ethereum-wallet-tx:not(.ethereum-wallet-tx-single) {
    padding: 0 10px;
  }
  .ethereum-wallet-tx-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 10px;
    width: 100%;
  }
  .ethereum-wallet-tx-list-header p {
    margin: 0;
    font-size: 14px;
    line-height: 20px;
    color: #202020;
    font-weight: 700;
  }
  .ethereum-wallet-tx-list-header svg {
    height: 24px;
    width: 24px;
  }

  .ethereum-wallet-tx-explorer-link {
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
  }
  .ethereum-wallet-tx-explorer-link:hover {
    background-color: #DDF3E4;
  }
  .ethereum-wallet-tx-explorer-link svg {
    height: 16px;
    width: 16px;
    color: #202020;
  }

  .ethereum-wallet-tx.ethereum-wallet-tx-signing {
    background-color: #F9F9F9;
    padding-bottom: 10px;
    border-radius: 8px;
  }
  .ethereum-wallet-tx.ethereum-wallet-tx-pending {
    background-color: #F9F9F9;
    border-radius: 8px;
  }
  .ethereum-wallet-tx.ethereum-wallet-tx-completed {
    background-color: #F2FCF5;
    border-radius: 8px;
  }

  .ethereum-wallet-tx-single .ethereum-wallet-tx-info-container {
    border-top: 1px solid #EBEBEB;
    border-bottom: 1px solid #EBEBEB;
  }
  .ethereum-wallet-tx-info-text > p {
    color: #646464;
    margin: 0;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.04px;
  }
  .ethereum-wallet-tx-info-text > p:not(:last-child) {
    margin-bottom: 8px;
  }

  .ethereum-wallet-tx-info-row {
    padding: 14px 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: 20px;
  }
  .ethereum-wallet-tx-info-col {
    padding: 14px 10px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    row-gap: 4px;
    align-items: start;
  }
  .ethereum-wallet-tx-info-text {
    padding: 10px;
  }
  .ethereum-wallet-tx-params,
  .ethereum-wallet-tx-params dl {
    margin: 0;
  }
  .ethereum-wallet-tx .ethereum-wallet-tx-params {
    border-top: 1px solid #EBEBEB;
    border-bottom: 1px solid #EBEBEB;
  }
  .ethereum-wallet-tx-params div:not(:last-child) {
    border-bottom: 1px solid #EBEBEB;
  }

  .ethereum-wallet-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: #1C2024;
    border: 1px solid rgba(1, 6, 47, 0.173) !important;
    background-color: #fff !important;
    padding: 14px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 700;
  }
  .ethereum-wallet-btn:hover {
    border: 1px solid rgba(1, 6, 47, 0.173);
    background-color: #F2F2F5 !important;
  }
  .ethereum-wallet-btn:focus-visible {
    outline: 2px solid;
    outline-offset: 2px;
    outline-color: #8B8D98;
    border: 1px solid rgba(1, 6, 47, 0.173);
  }
  .ethereum-wallet-btn-sm {
    padding: 10px 14px;
    font-size: 12px;
    line-height: 16px;
  }
  .ethereum-wallet-btn-xs {
    padding: 8px 12px;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.04px;
    border-radius: 9999px;
  }
  .ethereum-wallet-btn-confirm {
    width: 100%;
    margin-top: 24px;
  }
  .ethereum-wallet-btn-cancel {
    width: 100%;
    background-color: #FFF9F9 !important;
    color: #dc2626 !important;
    border: 1px solid #fecaca !important;
  }
  .ethereum-wallet-btn-cancel:hover {
    background-color: #fef2f2 !important;
  }
  .ethereum-wallet-btn-details {
    margin-top: 20px;
    border-radius: 9999px;
  }

  .ethereum-wallet-tx-error {
    font-size: 14px;
    line-height: 20px;
    color: #dc2626;
    font-weight: 700;
    text-align: center;
    text-wrap: balance;
    margin-top: 20px;
    margin-bottom: 0px;
  }

  .ethereum-wallet-txs-details {
    display: none;
    margin-top: 10px;
    padding: 10px;
    background: #F1F1F1;
    border-radius: 8px;
    width: 100%;
    max-width: 100%;
    overflow: auto;
  }
  .ethereum-wallet-txs-details p {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.04px;
    color: #646464;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    margin: 0;
  }

  .ethereum-wallet-txs-status {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px;
    background: #F1F4FE;
    border-radius: 8px;
    width: 100%;
    margin-top: 24px;
    border: 1px solid rgba(0,0,0,0);
  }
  .ethereum-wallet-txs-status p {
    margin: 0;
    color: #384EAC;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
  }

  .ethereum-wallet-tx-highlight {
    position: relative;
    z-index: 1;
  }
  .ethereum-wallet-tx-highlight::before {
    content: "";
    position: absolute;
    top: -4px;
    left: -6px;
    right: -6px;
    bottom: -4px;
    z-index: -1;
    background-color: #DDF3E4;
    border-radius: 8px;
  }

  .ethereum-wallet-spinner {
    position: absolute;
    right: 14px;
    top: 16px;
    width: 16px;
    height: 16px;
    border: 2px solid #384EAC;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: rotation 1s linear infinite;
  }
  @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
  }
`;
