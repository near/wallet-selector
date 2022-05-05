import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

const angularValueAccessorBindings: Array<ValueAccessorConfig> = [];

import {
  angularOutputTarget,
  ValueAccessorConfig,
} from "@stencil/angular-output-target";

import { reactOutputTarget } from "@stencil/react-output-target";

import { svelteOutputTarget } from "@stencil/svelte-output-target";

export const config: Config = {
  namespace: "selector-ui",
  taskQueue: "async",
  plugins: [sass()],
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    {
      type: "dist-custom-elements",
      autoDefineCustomElements: true,
    },
    {
      type: "docs-readme",
    },
    {
      type: "www",
      serviceWorker: null, // disable service workers
    },

    angularOutputTarget({
      componentCorePackage: "@near-wallet-selector/selector-ui",
      directivesProxyFile:
        "../../../packages/selector-ui-angular/src/generated/directives/proxies.ts",
      directivesArrayFile:
        "../../../packages/selector-ui-angular/src/generated/directives/directives.ts",
      valueAccessorConfigs: angularValueAccessorBindings,
    }),

    reactOutputTarget({
      componentCorePackage: "@near-wallet-selector/selector-ui",
      proxiesFile:
        "../../../packages/selector-ui-react/src/generated/components.ts",
      includeDefineCustomElements: true,
    }),

    svelteOutputTarget({
      componentCorePackage: "@near-wallet-selector/selector-ui",
      proxiesFile:
        "../../../packages/selector-ui-svelte/src/generated/components.ts",
      includeDefineCustomElements: true,
    }),
  ],
};
