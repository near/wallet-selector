import type { ModuleState, Wallet } from "@near-wallet-selector/core";
import { translate } from "@near-wallet-selector/core";
import { CloseIcon } from "./icons/CloseIcon";

export async function renderWalletConnecting(
  module: ModuleState<Wallet> | null = null
) {
  document.querySelector(".modal-right")!.innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header">
        <h3 class="middleTitle"></h3>
        <button class="close-button">
          ${CloseIcon}
        </button>
      </div>
      <div class="connecting-wrapper">
        <div class="content">
          <div class="icon">
            <img src="${module?.metadata.iconUrl}" alt="${
    module?.metadata.name
  }">
          </div>
          <h3 class="connecting-name">${module?.metadata.name}</h3>
          <div class="connecting-details">
            <div class="spinner"><img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAR3SURBVHgBpVZ9aJVVGH+e55z33bi7zY9hMz+yMAeNoEIq6A9ZRKQWEsQNFIIpsf5Y9E+GsD9iBEEDMUkDa6ShRKKZYIWiRkaKaUGUGCKOTGMF84PNO99773vOefq9720yK5ZzD/dwPt/nd37P17lEk5Qnuz9roUkKT7T5bNe+QjTNLCHv24h1Xgh+OmtwQYPH2jUXwlnW9NRooqePfLS6MmmQ59cdeEGJlkJZA5MGVecoAwghBYZTVY9ftuaDSy8x8w9fbFl95JZAXuw9dmelkvRAyXxS7wMFryG4bIyWZiqzPgMhaFfGfn3NY3AZG9sPf/Dy8HidZvxkZc/h1pqnPlKey6yspMqUd9jVAEYY6RCGDQTwjGDwGTgAlbwRijV1C9vanz577tT+6r+YrOz5rlXFrQ/qZ+FbDxCfXS5oOgxln4v473f3rbgwdn7FK5/MCaH2eAg6X8g3K2iBMTiBkNJVKbod+ze9mgPZsY/UaicYzCE1HgpZc558olCTjTvWLxv9p1n3bV45iO7T5zq3TU9j9xTOLwQ5D9t48aEYrtGj2P/2BpNS78nZJoRdlDsYd8vphz273lqyhW5Rnlnz3hOe6SEwghvxPUMTVfYe2rpuUOqOkZeIxdSbsSJ8eTIAmXy5tftrMPkzi0C4B2ZDNHp+INvLQURkhYiJ6gDGko376DbEJ8k3mcnYBSeSM2ptL/XGsurNnxfnDIQNwCKADO1845Ef6Tbk0M51g4joMgncDyBmkrtsNEMQovcDxGYsGL2yDNAUxPv0VySs4yxhfeYbabJg0Awg+ILylEB6nKMpSOp0WCR1+QSuD4ELljNDEfyRrdXPCU1BTEgD7pyOzVmC2iBm0KgYAMCEeXovoClIjdKiVdQ3FYbzmatxWRqMPcNsDHyfNWskWk5TkJhNEwVyxA6hLL5clLJsW7voFxa6LiR5CCOeWzo3XFxKtyEdy3tnp7VahAoDp6PEVGvJye09l3P7K9k9WQijXBv4B6WG+0pvD0ybFEBHZ6OPh+/OGaBsIvNRAGp/ZHv1jJeon+omszBkFsr3FhsLB7rev3JLQKVSyfjmaW2BJSavDlqR7c5VrR+4AbLttbkXMehH7gjA8gZiD/tq+Or/ABZ3dUW/J62LcPUGcrW8pKSVFAg6cHz3O0l25qZHa/XGwWPg9aAwwzdZAaDX+7tbNsMYf5+bpaUS0dDQEF8rtsUxCbI5e5KRzGhBMiqNxllKju7d8NOYXjseRBytQngcVDL3wD9H+7vf3YS7mnnzqrZpwSxrwkh04cpM5NTMyJdHbIgaESyxJ6tZ5cDbw3qd0tqVCp25Se/4yYdr5/zm/ehjwvpxZHgN0Wlub0/Yt7awdykqRYFHy6NUQVrBd4o6p6ngrVL2Bo8ksuJqoXzq9Ln9m6rj9U74b6Wjo8OeP082aY5NUxRsYzwDkeFsU+MdUU3U4PG0QtbahqhadDMuHTy4fvS/9EwIUpdeuW/ZiShOipFxURRbNdWETFMRZrCFlEZGkuPHdycTafgLExNiI6YfUpcAAAAASUVORK5CYII="
                alt="loading-icon"></div>
                <span>
                  ${translate("modal.wallet.connectingTo")} ${
    module?.metadata.name
  }...
                </span>
        </div>
          <div class="connecting-message">
            <span>
              ${translate("modal.wallet.connectingMessage." + module?.type)}
            </span>
          </div>
      </div>
    </div>
  </div>
  `;
}
