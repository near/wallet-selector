export default `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap');

#near-wallet-selector-modal {
  --backdrop-bg: #26262630;
  --heading-color: #262626;
  --text-color: #676767;
  --selected-wallet-bg: #A7A7A730;
  --selected-wallet-bg-hover: transparent;
  --wallet-option-border-color: #A7A7A730;
  --content-bg: #FFFFFF;
  --input-border-color-focus: #5F8AFA;
  --box-shadow-color: #26262630;
  --dismiss-button-bg-hover: #A7A7A730;
  --dismiss-button-border-color-hover: inherit;
  --confirm-button-color: #FFFFFF;
  --confirm-button-bg: #5F8AFA;
  --confirm-button-bg-hover: #5AA6FF;
  --confirm-button-border-color: #5F8AFA;
  --error: #DB5555;
  --modal-close-button-color: #262626;
}

#near-wallet-selector-modal .dark-theme {
  --backdrop-bg: #26262630;
  --heading-color: #FFFFFF;
  --text-color: #FFFFFF;
  --selected-wallet-bg: #262626CC;
  --selected-wallet-bg-hover: #262626CC;
  --wallet-option-border-color: #A7A7A730;
  --content-bg: #3F4246;
  --input-border-color-focus: #5F8AFA;
  --box-shadow-color: #26262630;
  --dismiss-button-bg-hover: #262626CC;
  --dismiss-button-border-color-hover: #262626;;
  --confirm-button-color: #FFFFFF;
  --confirm-button-bg: #5F8AFA;
  --confirm-button-bg-hover: #5AA6FF;
  --confirm-button-border-color: #5F8AFA;
  --error: #DB5555;
  --modal-close-button-color: #A7A7A7;
}

@media (prefers-color-scheme: dark) {
  #wallet-selector-modal {
    --backdrop-bg: #26262630;
    --heading-color: #FFFFFF;
    --text-color: #FFFFFF;
    --selected-wallet-bg: #262626CC;
    --selected-wallet-bg-hover: #262626CC;
    --wallet-option-border-color: #A7A7A730;
    --content-bg: #3F4246;
    --input-border-color-focus: #5F8AFA;
    --box-shadow-color: #26262630;
    --dismiss-button-bg-hover: #262626CC;
    --dismiss-button-border-color-hover: #262626;;
    --confirm-button-color: #FFFFFF;
    --confirm-button-bg: #5F8AFA;
    --confirm-button-bg-hover: #5AA6FF;
    --confirm-button-border-color: #5F8AFA;
    --error: #DB5555;
    --modal-close-button-color: #A7A7A7;
  }
}
/**
 * Modal Wrapper
 */

.modal-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  visibility: hidden;
  //transition: visibility 0s linear 0.25s, opacity 0.25s 0s;
  color: var(--wallet-selector-text-color, var(--text-color));
  font-family: Manrope, sans-serif;
  font-weight: 500;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-wrapper .modal-overlay {
  background: var(--wallet-selector-backdrop-bg, var(--backdrop-bg));
  height: 100%;
  width: 100%;
  position: absolute;
}
/**
 * Modal
 */

.modal-wrapper .modal {
  background: var(--wallet-selector-content-bg, var(--content-bg));
  width: 400px;
  max-width: 700px;
  height: auto;
  max-height: 70vh;
  border-radius: 16px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0px);
  transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
  background-color: var(--wallet-selector-content-bg, var(--content-bg));
  padding: 32px;
  overflow-y: auto;
  font-size: 16px;
  line-height: 1.6;
}

.modal-wrapper .modal {
  box-sizing: content-box;
}

/**
 * Modal Header
 */

.modal-wrapper .modal .modal-header {
  display: flex;
  align-items: start;
  justify-content: space-between;
}

.modal-wrapper .modal .modal-header .close-button {
  border: 0;
  cursor: pointer;
  height: 24px;
  padding: 4px;
  background-color: transparent;
}

.modal-wrapper .modal .modal-header .close-button:active {
  background: transparent;
}

.modal-wrapper .modal .modal-header .close-button svg {
  pointer-events: none;
}

.modal-wrapper .modal .modal-header .close-button:hover svg {
  fill: var(--wallet-selector-modal-close-button-color, var(--modal-close-button-color));
  transition: all 0.2s ease-in;
}

.modal-wrapper .modal .modal-header h2 {
  color: var(--wallet-selector-heading-color, var(--heading-color));
  font-size: 22px;
  margin-top: 0;
  margin-bottom: 20px;
}

/**
 * Modal buttons and inputs
 */

.modal-wrapper .modal .modal-body input,
.modal-wrapper .modal .modal-body button {
  background: inherit;
  font-size: 14.2px;
  font-family: inherit;
  border-width: 1px;
  border-style: solid;
  border-color: inherit;
  border-radius: 40px;
  margin-top: 8px;
  padding: 0.55em 1.4em;
  text-align: center;
  color: inherit;
  transition: background 150ms ease-in-out;
  line-height: 1.15;
  cursor: pointer;
}

.modal-wrapper .modal .action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-wrapper .modal .action-buttons .left-button:hover {
  background-color: var(--wallet-selector-dismiss-button-bg-hover, var(--dismiss-button-bg-hover));
  border-color: var(--wallet-selector-dismiss-button-border-color-hover, var(--dismiss-button-border-color-hover))
}

.modal-wrapper .modal .action-buttons .right-button {
  color: var(--wallet-selector-confirm-button-color, var(--confirm-button-color));
  background-color: var(--wallet-selector-confirm-button-bg, var(--confirm-button-bg));
  border: 1px solid var(--wallet-selector-confirm-button-border-color, var(--confirm-button-border-color));
}

.modal-wrapper .modal .action-buttons .right-button:hover {
  background-color: var(--wallet-selector-confirm-button-bg-hover, var(--confirm-button-bg-hover));
}

/**
 * Modal Switch Network Message Section/Wrapper
 */

.modal-wrapper .modal .switch-network-message-wrapper .header h2 {
  font-size: 18px;
  margin-top: 0;
  color: var(--wallet-selector-heading-color, var(--heading-color));
}

.modal-wrapper .modal .switch-network-message-wrapper .content  p {
  font-size: 14.25px;
}

/**
 * Modal Ledger Derivation Path Section/Wrapper
 */

.modal-wrapper .modal .ledger-derivation-path-wrapper .derivation-path-list {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}
.modal-wrapper .modal .ledger-derivation-path-wrapper input:focus {
  border: 2px solid var(--wallet-selector-input-border-color-focus, var(--input-border-color-focus));
}
.modal-wrapper .modal .ledger-derivation-path-wrapper input:focus-visible {
  border: none;
  outline: 2px solid var(--wallet-selector-input-border-color-focus, var(--input-border-color-focus));
}
.modal-wrapper .modal .ledger-derivation-path-wrapper .input-error {
  border-color: var(--wallet-selector-error, var(--error)) !important;
}
.modal-wrapper .modal .ledger-derivation-path-wrapper .error {
  font-family: inherit;
  color: var(--wallet-selector-error, var(--error));
}

/**
 * Modal Wallet Options Section/Wrapper
 */

.modal-wrapper .modal .wallet-options-wrapper .description {
  margin-top: 0;
  margin-bottom: 20px;
}

.modal-wrapper .modal .wallet-options-wrapper .options-list li span {
  font-size: 14px;
}
.modal-wrapper .modal .wallet-options-wrapper .options-list {
  margin: 0;
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.modal-wrapper .modal .wallet-options-wrapper .options-list li {
  padding: 1em;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid var(--wallet-selector-wallet-option-border-color, var(--wallet-option-border-color));
  display: flex;
  transition: background-color 0.2s ease-in-out;
}

.modal-wrapper .modal .wallet-options-wrapper .options-list li div {
  margin: auto;
}

.modal-wrapper .modal .wallet-options-wrapper .options-list li img {
  display: block;
  margin: 0 auto 5px;
  max-width: 50px;
}

.modal-wrapper .modal .wallet-options-wrapper .options-list li:hover {
  background-color: var(--wallet-selector-selected-wallet-bg-hover, var(--selected-wallet-bg-hover));
}

.modal-wrapper .modal .wallet-options-wrapper .options-list li.selected-wallet {
  background-color: var(--wallet-selector-selected-wallet-bg, var(--selected-wallet-bg));
}

.modal-wrapper .modal .wallet-options-wrapper .options-list li .selected-wallet-text {
  text-align: center;
}

.modal-wrapper .modal .wallet-options-wrapper .options-list li .selected-wallet-text span {
  font-size: 14px;
  font-weight: 500;
}

.modal-wrapper .modal .wallet-options-wrapper .options-list:not(.selection-process) li:hover {
  box-shadow: 0 2px 10px 0 var(--wallet-selector-box-shadow-color, var(--box-shadow-color));
}

/**
 * Modal Wallet Options Info Section/Wrapper
 */

.modal-wrapper .modal .info {
  margin-top: 20px;
}

.modal-wrapper .modal .info span {
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease-out;
}

.modal-wrapper .modal .info .info-description {
  max-height: 0;
  transition: all 300ms ease-out;
  overflow: hidden;
}

.modal-wrapper .modal .info .info-description p {
  font-size: 14px;
  margin-bottom: 0;
}

.modal-wrapper .modal .info .info-description.show-explanation {
  animation: inAnimation 350ms ease-in;
  max-height: 300px;
}

.modal-wrapper .modal .info .info-description.hide-explanation {
  animation: outAnimation 200ms ease-out;
  animation-fill-mode: forwards;
}

.open {
  opacity: 1;
  visibility: visible;
  transition: visibility 0s linear 0s, opacity 0.25s 0s;
}

@media (max-width: 600px) {
  .modal-wrapper .modal {
    width: 250px;
  }
}

.modal-wrapper.dark-theme .modal .wallet-options-wrapper .options-list #near-wallet img,
.modal-wrapper.dark-theme .modal .wallet-options-wrapper .options-list #math-wallet img,
.modal-wrapper.dark-theme .modal .wallet-options-wrapper .options-list #wallet-connect img {
  filter: invert(1);
}

@media (prefers-color-scheme: dark) {
  .modal-wrapper .modal .wallet-options-wrapper .options-list #near-wallet img,
  .modal-wrapper .modal .wallet-options-wrapper .options-list #math-wallet img,
  .modal-wrapper .modal .wallet-options-wrapper .options-list #wallet-connect img {
    filter: invert(1);
  }
}

@keyframes outAnimation {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}

`;
