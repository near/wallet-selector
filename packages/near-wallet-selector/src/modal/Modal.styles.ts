export default `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap');

.Modal {
  --backdrop-bg: #26262630;
  --black: #262626;
  --black-rgb: 38, 38, 38;
  --dark-gray: #3F4246;
  --dark-gray-op-30: #A7A7A730;
  --light-gray: #A7A7A7;
  --text-color: #676767;
  --white: #FFFFFF;
  --blue: #5F8AFA;
  --red: #DB5555;
}

.Modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Manrope, sans-serif;
  font-weight: 500;
}

.Modal * {
  box-sizing: content-box;
}

.Modal, .Modal.Modal-light-theme {
  color: var(--text-color);
}

.Modal .Modal-content {
  max-width: 700px;
  max-height: 70vh;
  width: 400px;
  background-color: var(--white);
  margin: 10px;
  border-radius: 16px;
  padding: 32px;
  overflow-y: auto;
}

.Modal-option-list li span {
  font-size: 14px;
}

.Modal .Modal-content {
  font-size: 16px;
  line-height: 1.6;
}

.Modal-description {
  margin-top: 0px;
  margin-bottom: 20px;
}

.Modal-header {
  display: flex;
  align-items: start;
  justify-content: space-between;
}

.Modal-header button {
  border: 0;
  cursor: pointer;
  height: 24px;
  padding: 4px;
  background-color: transparent;
}

.Modal-header button:active {
  background: transparent;
}

.Modal-header button svg {
  pointer-events: none;
}

.Modal-header button:hover svg {
  fill: var(--black);
  transition: all 0.2s ease-in;
}

.Modal-header h2 {
  color: var(--black);
  font-size: 22px;
  margin-top: 0;
  margin-bottom: 20px;
}

.Modal-option-list {
  margin: 0;
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.Modal-option-list li {
  padding: 1em;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid var(--dark-gray-op-30);
  display: flex;
}

.Modal-option-list li div {
  margin: auto;
}

.Modal-option-list li:hover {
  box-shadow: 0 2px 10px 0 var(--backdrop-bg);
}

.Modal-option-list li img {
  display: block;
  margin: 0 auto 5px;
  max-width: 50px;
}

.Modal-option-list li.selected-wallet {
  background-color: var(--dark-gray-op-30);
}
.Modal-option-list li .selected-wallet-text {
  text-align: center;
}

.Modal-option-list li .selected-wallet-text span  {
  font-size: 14px;
  font-weight: 500;
}

.derivation-paths-list {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}

.Modal-body button, .Modal-body input {
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
  font-family: inherit;
  transition: background 150ms ease-in-out;
  line-height: 1.15;
  cursor: pointer;
}

.Modal-body input:focus {
   border: 2px solid rgb(64, 153, 255);
}

.derivation-paths--actions {
  display: flex;
  justify-content: space-between;
}

.path-option-highlighted {
  border-color: var(--blue)!important;
}

.error {
  font-family: inherit;
  color: var(--red);
}
.info {
  margin-top: 20px;
}

.info span {
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease-out;
}

.info .info-description {
  max-height: 0px;
  transition: all 300ms ease-out;
  overflow: hidden;
}

.info .info-description p {
    font-size: 14px;
    margin-bottom: 0px;
}

.info-description.show-explanation {
  animation: inAnimation 350ms ease-in;
  max-height: 300px;
}
.info-description.hide-explanation {
  animation: outAnimation 200ms ease-out;
  animation-fill-mode: forwards;
}

.input-error {
  border-color: var(--red)!important;
}

.Modal-wallet-not-installed .icon-display {
  display: flex;
  align-items: center;
}

.Modal-wallet-not-installed .icon-display img {
  margin-right: 10px;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.Modal-wallet-not-installed .refresh-link {
  color: var(--blue);
  cursor: pointer;
}

.Modal-wallet-not-installed .action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.Modal .Modal-content .left-button {
  border: 0.5px solid var(--light-gray);
}
.Modal .Modal-content .left-button:hover {
  background-color: var(--dark-gray-op-30);
}

.Modal .Modal-content .right-button {
  color: var(--white);
  background-color: var(--blue);
  border: 1px solid var(--blue);
}

.Modal .Modal-content .right-button:hover {
  background-color: rgb(89 166 255);
}

.Modal-switch-network-message .header h2 {
  font-size: 18px;
  margin-top: 0px;
  color: var(--black);
}

.Modal-switch-network-message .content p {
  font-size: 14.25px;
}

.Modal-switch-network-message .actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.Modal-dark-theme .Modal-content {
  background-color: var(--dark-gray);
  color: var(--white);
}

.Modal-dark-theme .Modal-content .Modal-header h2 {
  color: var(--white);
}

.Modal-dark-theme .Modal-header button:hover svg {
  fill: var(--light-gray);
}

.Modal-dark-theme .Modal-content .Modal-option-list li {
  border-color: var(--dark-gray-op-30);
  transition: background-color 0.2s ease-in-out;
}

.Modal-dark-theme .Modal-content .Modal-option-list li:first-child img,
.Modal-dark-theme .Modal-content .Modal-option-list #math-wallet img,
.Modal-dark-theme .Modal-wallet-not-installed .math-wallet img {
  filter: invert(1);
}

.Modal-dark-theme .Modal-content .Modal-option-list li:hover,
.Modal-dark-theme .Modal-content .Modal-option-list li.selected-wallet {
  background-color: rgba(var(--black-rgb), 0.8);
}

.Modal-dark-theme .Modal-switch-network-message .header h2 {
  color: var(--white);
}

.Modal-dark-theme .Modal-content .info span:hover {
  color: var(--light-gray);
  transition: all 200ms ease-in;
}

.Modal-dark-theme .Modal-content .left-button:hover {
    background-color: rgba(var(--black-rgb), 0.8);
    border-color: var(--black);
}

@media (prefers-color-scheme: dark) {
  .Modal .Modal-content {
    background-color: var(--dark-gray);
    color: var(--white);
  }

  .Modal-content .Modal-header h2 {
    color: var(--white);
  }

  .Modal-header button:hover svg {
    fill: var(--light-gray);
  }

  .Modal-content .Modal-option-list li {
    border-color: var(--dark-gray-op-30);
    transition: background-color 0.2s ease-in-out;
  }

  .Modal-content .Modal-option-list li:first-child img,
  .Modal-content .Modal-option-list #math-wallet img,
  .Modal-content .Modal-wallet-not-installed .math-wallet img,
  .Modal-content .Modal-option-list #wallet-connect img {
    filter: invert(1);
  }

  .Modal-content .Modal-option-list li:hover,
  .Modal-content .Modal-option-list li.selected-wallet {
    background-color: rgba(var(--black-rgb), 0.8);
  }

  .Modal-switch-network-message .header h2 {
    color: var(--white);
  }

  .Modal-content .info span:hover {
    color: var(--light-gray);
    transition: all 200ms ease-in;
  }

  .Modal .Modal-content .left-button:hover {
      background-color: rgba(var(--black-rgb), 0.8);
      border-color: var(--black);
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
