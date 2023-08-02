import type { ReactElement } from "react";
import { useEffect } from "react";
import React, { Fragment } from "react";
import { translate } from "@near-wallet-selector/core";
import { ModalHeader } from "./ModalHeader";
import type { ExportAccountData } from "./ExportAccount";
import { ACCESS_KEY_TYPES } from "./ExportAccount";

interface AccountSelectProps {
  onCloseModal: () => void;
  onBack: () => void;
  selectedAccounts: Array<string>;
  setSelectedAccounts: (accounts: Array<string>) => void;
  accountsWithDetail: Array<ExportAccountData>;
  disabledAccounts: Array<ExportAccountData>;
  onNextStep: () => void;
  isLoading: boolean;
  buttonLabel: string;
}

interface WarningLabelProp {
  hasBalance: boolean;
  type: string;
}

const LOADING_ICON_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAR3SURBVHgBpVZ9aJVVGH+e55z33bi7zY9hMz+yMAeNoEIq6A9ZRKQWEsQNFIIpsf5Y9E+GsD9iBEEDMUkDa6ShRKKZYIWiRkaKaUGUGCKOTGMF84PNO99773vOefq9720yK5ZzD/dwPt/nd37P17lEk5Qnuz9roUkKT7T5bNe+QjTNLCHv24h1Xgh+OmtwQYPH2jUXwlnW9NRooqePfLS6MmmQ59cdeEGJlkJZA5MGVecoAwghBYZTVY9ftuaDSy8x8w9fbFl95JZAXuw9dmelkvRAyXxS7wMFryG4bIyWZiqzPgMhaFfGfn3NY3AZG9sPf/Dy8HidZvxkZc/h1pqnPlKey6yspMqUd9jVAEYY6RCGDQTwjGDwGTgAlbwRijV1C9vanz577tT+6r+YrOz5rlXFrQ/qZ+FbDxCfXS5oOgxln4v473f3rbgwdn7FK5/MCaH2eAg6X8g3K2iBMTiBkNJVKbod+ze9mgPZsY/UaicYzCE1HgpZc558olCTjTvWLxv9p1n3bV45iO7T5zq3TU9j9xTOLwQ5D9t48aEYrtGj2P/2BpNS78nZJoRdlDsYd8vphz273lqyhW5Rnlnz3hOe6SEwghvxPUMTVfYe2rpuUOqOkZeIxdSbsSJ8eTIAmXy5tftrMPkzi0C4B2ZDNHp+INvLQURkhYiJ6gDGko376DbEJ8k3mcnYBSeSM2ptL/XGsurNnxfnDIQNwCKADO1845Ef6Tbk0M51g4joMgncDyBmkrtsNEMQovcDxGYsGL2yDNAUxPv0VySs4yxhfeYbabJg0Awg+ILylEB6nKMpSOp0WCR1+QSuD4ELljNDEfyRrdXPCU1BTEgD7pyOzVmC2iBm0KgYAMCEeXovoClIjdKiVdQ3FYbzmatxWRqMPcNsDHyfNWskWk5TkJhNEwVyxA6hLL5clLJsW7voFxa6LiR5CCOeWzo3XFxKtyEdy3tnp7VahAoDp6PEVGvJye09l3P7K9k9WQijXBv4B6WG+0pvD0ybFEBHZ6OPh+/OGaBsIvNRAGp/ZHv1jJeon+omszBkFsr3FhsLB7rev3JLQKVSyfjmaW2BJSavDlqR7c5VrR+4AbLttbkXMehH7gjA8gZiD/tq+Or/ABZ3dUW/J62LcPUGcrW8pKSVFAg6cHz3O0l25qZHa/XGwWPg9aAwwzdZAaDX+7tbNsMYf5+bpaUS0dDQEF8rtsUxCbI5e5KRzGhBMiqNxllKju7d8NOYXjseRBytQngcVDL3wD9H+7vf3YS7mnnzqrZpwSxrwkh04cpM5NTMyJdHbIgaESyxJ6tZ5cDbw3qd0tqVCp25Se/4yYdr5/zm/ehjwvpxZHgN0Wlub0/Yt7awdykqRYFHy6NUQVrBd4o6p6ngrVL2Bo8ksuJqoXzq9Ln9m6rj9U74b6Wjo8OeP082aY5NUxRsYzwDkeFsU+MdUU3U4PG0QtbahqhadDMuHTy4fvS/9EwIUpdeuW/ZiShOipFxURRbNdWETFMRZrCFlEZGkuPHdycTafgLExNiI6YfUpcAAAAASUVORK5CYII=";

const getWarningLabel = ({
  hasBalance,
  type,
}: WarningLabelProp): ReactElement | null => {
  if (type === ACCESS_KEY_TYPES.UNKNOWN) {
    return (
      <span className="error">
        {translate("modal.exportAccounts.selectAccounts.error")}
      </span>
    );
  }
  if (type === ACCESS_KEY_TYPES.LEDGER) {
    return (
      <span className="warning">
        {translate("modal.exportAccounts.selectAccounts.warningLedger")}
      </span>
    );
  }
  if (!hasBalance) {
    return (
      <span className="warning">
        {translate("modal.exportAccounts.selectAccounts.noBalance")}
      </span>
    );
  }
  return null;
};

export const AccountSelect: React.FC<AccountSelectProps> = ({
  onCloseModal,
  onBack,
  selectedAccounts,
  setSelectedAccounts,
  accountsWithDetail,
  disabledAccounts,
  onNextStep,
  isLoading,
  buttonLabel,
}) => {
  const onAccountSelect = (accountId: string, checked: boolean) => {
    if (checked) {
      setSelectedAccounts([...selectedAccounts, accountId]);
    } else {
      setSelectedAccounts(
        selectedAccounts.filter(
          (existingAccountId: string) => existingAccountId !== accountId
        )
      );
    }
  };

  const onSelectAll = () => {
    if (selectedAccounts.length === accountsWithDetail.length) {
      setSelectedAccounts([]);
      return;
    }
    setSelectedAccounts(accountsWithDetail.map(({ accountId }) => accountId));
  };

  const selectLabel =
    selectedAccounts.length === accountsWithDetail.length
      ? translate("modal.exportAccounts.selectAccounts.deselectAll")
      : translate("modal.exportAccounts.selectAccounts.selectAll");

  useEffect(() => {
    // Select all available accounts by default
    if (!selectedAccounts.length) {
      setSelectedAccounts(accountsWithDetail.map(({ accountId }) => accountId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountsWithDetail.length]);

  return (
    <Fragment>
      <div className="nws-modal-header-wrapper">
        <ModalHeader
          title={translate("modal.exportAccounts.selectAccounts.title")}
          onCloseModal={onCloseModal}
          onBack={onBack}
        />
      </div>
      <div className="account-export connecting-wrapper">
        <div className="content">
          {isLoading ? (
            <div className="connecting-details">
              <div className="spinner account-selection-spinner">
                <img src={LOADING_ICON_DATA_URL} alt="loading-icon" />
              </div>
            </div>
          ) : (
            <>
              <div className="account-selection-container">
                <span className="account-select-all" onClick={onSelectAll}>
                  {selectLabel}
                </span>
                <div className="account-selection">
                  {accountsWithDetail.map(({ accountId }) => (
                    <div className="account-selection-row" key={accountId}>
                      <div className="checkbox">
                        <input
                          onChange={(e) => {
                            onAccountSelect(accountId, e.target.checked);
                          }}
                          checked={selectedAccounts.includes(accountId)}
                          type="checkbox"
                          id={accountId}
                          name={accountId}
                          value={accountId}
                        />
                        <label htmlFor={accountId} title={accountId}>
                          <span className="label">{accountId}</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                {disabledAccounts.length > 0 && (
                  <>
                    <span className="account-unavailable">
                      {translate(
                        "modal.exportAccounts.selectAccounts.unavailable"
                      )}
                    </span>
                    <div className="account-selection">
                      {disabledAccounts.map(
                        ({ accountId, type, hasBalance }) => (
                          <div
                            className="account-selection-row"
                            key={accountId}
                          >
                            <div className="checkbox">
                              <input
                                onChange={(e) => {
                                  onAccountSelect(accountId, e.target.checked);
                                }}
                                checked={selectedAccounts.includes(accountId)}
                                type="checkbox"
                                id={accountId}
                                name={accountId}
                                value={accountId}
                                disabled
                              />
                              <label htmlFor={accountId} title={accountId}>
                                <span className="account-id">{accountId}</span>
                                {getWarningLabel({ hasBalance, type })}
                              </label>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}
                <div className="filler" />
              </div>
              <button
                className="middleButton account-export-button"
                onClick={onNextStep}
                disabled={selectedAccounts.length === 0}
              >
                {translate(buttonLabel)}
              </button>
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};
