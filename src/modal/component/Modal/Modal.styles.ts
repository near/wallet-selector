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

.Modal .Modal-content {
  max-width: 700px;
  max-height: 70vh;
  width: 400px;
  background-color: white;
  margin: 10px;
  border-radius: 16px;
  padding: 1.5em;
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

.derivation-paths {
}
.derivation-paths-list {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
}
.Modal-body button, .Modal-body input {
    background: inherit;
    font-size: 0.889em;
    font-family: inherit;
    border-width: 1px;
    border-style: solid;
    border-color: inherit;
    border-radius: 40px;
    margin-top: 0.5rem;
    padding: 0.55em 1.4em;
    text-align: center;
    color: inherit;
    font-family: inherit;
    transition: background 150ms ease-in-out;
    line-height: 1.15;
    cursor: pointer;
 }
 
 .derivation-paths--actions {
    display: flex;
    justify-content: space-between;
 }
 .derivation-paths--actions button {
    padding: 8px 12px;
    border-radius: 16px;
    cursor: pointer;
 }
 
.derivation-paths--actions .connect {
    color: white;
    border: 1px solid rgb(64, 153, 255);
    background: rgb(64, 153, 255);
 }
    
.derivation-paths--actions .dismiss {
    border: 0.5px solid #bfbfbf;
}

.derivation-paths--actions .connect:hover {
    background-color: rgb(89 166 255);
 }
 
.derivation-paths--actions .dismiss:hover {
    background-color: #ebebeb;
}

.path-option-highlighted {
  border-color: rgb(64, 153, 255) !important;
}

.error {
    font-size: 0.889em;
    font-family: inherit;
    color: inherit;
    margin-top: 0.5rem;
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

.Modal-wallet-not-installed .action-buttons .back {
    border: 0.5px solid #bfbfbf;
}
.Modal-wallet-not-installed .action-buttons .back:hover {
    background-color: #ebebeb;
}

.Modal-wallet-not-installed .action-buttons .download {
    color: white;
    background-color: rgb(64, 153, 255);
    border: 1px solid rgb(64, 153, 255);
}

.Modal-wallet-not-installed .action-buttons .download:hover {
    background-color: rgb(89 166 255);
}


.Modal-dark-theme .Modal-content {
  background-color: #414141;
  color: white;
}

.Modal-dark-theme .Modal-content .Modal-option-list li {
  border-color: #393939;
  transition: background-color 0.2s ease-in-out;
}

.Modal-dark-theme .Modal-content .Modal-option-list li:first-child img{
  filter: invert(1);
}


.Modal-dark-theme .Modal-content .Modal-option-list li:hover {
  background-color: #313131;
}

.Modal-dark-theme .Modal-content .info span:hover {
    color: #a2a2a2;
    transition: all 200ms ease-in;
}

.Modal-dark-theme .Modal-wallet-not-installed .action-buttons .back:hover,
.Modal-dark-theme .derivation-paths--actions .dismiss:hover {
    background-color: #313131;
}

@keyframes inAnimation {
  0% {
    opacity: 0;
    visibility: hidden;
  }
  100% {
    opacity: 1;
    visibility: visible;
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

@media (prefers-color-scheme: dark) {
  .Modal:not(.Modal-light-theme) .Modal-content {
    background-color: #26292a !important;
    color: white;
  }

  .Modal:not(.Modal-light-theme) .Modal-content .Modal-option-list li {
    border-color: black;
  }

  .Modal:not(.Modal-light-theme) .Modal-content .Modal-option-list li:hover {
    border-color: white;
  }
}

`;
