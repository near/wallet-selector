import React from "react";
import { createRoot } from "react-dom/client";
import {
  applyPolyfills,
  defineCustomElements,
} from "@near-wallet-selector/selector-ui/loader";

import App from "./App";

applyPolyfills()
  .then(() => defineCustomElements())
  .then(() => {
    const container = document.getElementById("root");
    const root = createRoot(container!);

    root.render(<App />);
  });
