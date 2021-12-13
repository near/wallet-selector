import React from "react";
import providers from "../../providers";
import "./Modal.css";

function Modal(props: any): JSX.Element {
  function handleCloseModal(event: any) {
    event.preventDefault();
    if (event.target === event.currentTarget) props.onClose();
  }

  function getThemeClass(theme: string) {
    let themeClass = "";
    switch (theme) {
      case "dark":
        themeClass = "Modal-dark-theme";
        break;
      case "light":
        themeClass = "Modal-light-theme";
        break;
      default:
        themeClass = "";
        break;
    }
    return themeClass;
  }

  return (
    <div
      className={`Modal ${getThemeClass(props.options.theme)}`}
      onClick={handleCloseModal}
    >
      <div className="Modal-content">
        <div className="Modal-body">
          <ul className="Modal-option-list">
            {props.options.providers.map((provider: string) => (
              <li
                key={providers.getProvider(provider).getName()}
                onClick={providers.getProvider(provider).connect}
              >
                <div title={providers.getProvider(provider).getDescription()}>
                  <img
                    src={providers.getProvider(provider).getIcon()}
                    alt={providers.getProvider(provider).getName()}
                  />
                  <span>{providers.getProvider(provider).getName()}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Modal;
