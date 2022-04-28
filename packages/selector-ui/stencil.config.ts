import { Config } from "@stencil/core";
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: "selector-ui",
  taskQueue: "async",
  plugins:[sass()],
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    {
      type: "dist-custom-elements",
    },
    {
      type: "docs-readme",
    },
    {
      type: "www",
      serviceWorker: null, // disable service workers
    },
  ],
};
