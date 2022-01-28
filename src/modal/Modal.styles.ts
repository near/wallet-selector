export default `
.Modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
}

.Modal * {
  box-sizing: content-box;
}

.Modal.Modal-light-theme {
  color: #000;
}

.Modal .Modal-content {
  max-width: 700px;
  max-height: 70vh;
  width: 400px;
  background-color: #fff;
  margin: 10px;
  border-radius: 16px;
  padding: 24px;
  overflow-y: auto;
}

.Modal-option-list li span,
.Modal .Modal-content p {
  font-size: 16px;
}

.Modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(214, 214, 214);
  padding-bottom: 0.5em;
}

.Modal-header button {
  border: 0;
  cursor: pointer;
}

.Modal-header h3 {
  margin: 0;
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
  border: 1px solid #f4f4f4;
  display: flex;
}

.Modal-option-list li div {
  margin: auto;
}

.Modal-option-list li:hover {
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
}

.Modal-option-list li img {
  display: block;
  margin: 0 auto 5px;
  max-width: 50px;
}

.Modal-option-list li.selected-wallet {
  background: #ededed;
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
 
.derivation-paths--actions .right-button {
  color: white;
  border: 1px solid rgb(64, 153, 255);
  background: rgb(64, 153, 255);
}
    
.derivation-paths--actions .left-button {
  border: 0.5px solid #bfbfbf;
}

.derivation-paths--actions .right-button:hover {
  background-color: rgb(89 166 255);
}
 
.derivation-paths--actions .left-button:hover {
  background-color: #ebebeb;
}

.path-option-highlighted {
  border-color: rgb(64, 153, 255) !important;
}

.error {
  font-family: inherit;
  color: inherit;
  color: #e2504a;
}
.info {
  margin-top: 20px;
}

.info span {
  font-size: 14px;
  font-weight: 500;
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
  border-color: #e2504a;
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
  color: rgb(64, 153, 255);
  cursor: pointer;
}

.Modal-wallet-not-installed .action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.Modal-wallet-not-installed .action-buttons .left-button,
.Modal-switch-network-message .actions .left-button {
  border: 0.5px solid #bfbfbf;
}
.Modal-wallet-not-installed .action-buttons .left-button:hover,
.Modal-switch-network-message .actions .left-button:hover {
  background-color: #ebebeb;
}

.Modal-wallet-not-installed .action-buttons .right-button,
.Modal-switch-network-message .actions .right-button {
  color: white;
  background-color: rgb(64, 153, 255);
  border: 1px solid rgb(64, 153, 255);
}

.Modal-wallet-not-installed .action-buttons .right-button:hover,
.Modal-switch-network-message .actions .right-button:hover {
  background-color: rgb(89 166 255);
}

.Modal-switch-network-message .header h2 {
  font-size: 24px;
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
  background-color: #414141;
  color: white;
}
  
.Modal-dark-theme .Modal-content .Modal-option-list li {
  border-color: #393939;
  transition: background-color 0.2s ease-in-out;
}

.Modal-dark-theme .Modal-content .Modal-option-list li:first-child img  {
  filter: invert(1);
}

.Modal-dark-theme .Modal-content .Modal-option-list li:hover,
.Modal-dark-theme .Modal-content .Modal-option-list li.selected-wallet {
  background-color: #313131;
}

.Modal-dark-theme .Modal-content .info span:hover {
  color: #a2a2a2;
  transition: all 200ms ease-in;
}

.Modal-dark-theme .Modal-wallet-not-installed .action-buttons .left-button:hover,
.Modal-dark-theme .derivation-paths--actions .left-button:hover,
.Modal-dark-theme .Modal-switch-network-message .left-button:hover {
    background-color: #313131;
}

@media (prefers-color-scheme: dark) {
  .Modal .Modal-content {
    background-color: #414141;
    color: white;
  }
    
  .Modal-content .Modal-option-list li {
    border-color: #393939;
    transition: background-color 0.2s ease-in-out;
  }
  
  .Modal-content .Modal-option-list li:first-child img  {
    filter: invert(1);
  }

  .Modal-content .Modal-option-list li:hover,
  .Modal-content .Modal-option-list li.selected-wallet {
    background-color: #313131;
  }

  .Modal-content .info span:hover {
    color: #a2a2a2;
    transition: all 200ms ease-in;
  }

  .Modal-wallet-not-installed .action-buttons .left-button:hover,
  .derivation-paths--actions .left-button:hover,
  .Modal-switch-network-message .left-button:hover {
      background-color: #313131;
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
