/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import dts from "vite-plugin-dts";
import * as path from "path";

const getWalletConfig = (target: string) => {
  const configs = {
    buildMeteorWallet: {
      entry: "src/wallet/meteor-wallet.ts",
      name: "meteorWallet",
      outDir: "dist/meteor-wallet",
    },
  };

  const config =
    configs[target as keyof typeof configs] || configs["buildMeteorWallet"];
  return config;
};

export default defineConfig(({ mode }) => {
  process.env = { ...loadEnv(mode, process.cwd(), "") };

  const target = process.env.NX_TASK_TARGET_TARGET || "buildMeteorWallet";
  const walletConfig = getWalletConfig(target);

  return {
    cacheDir: "../../node_modules/.vite/adapter",
    plugins: [
      dts({
        entryRoot: "src",
        tsconfigPath: path.join(__dirname, "tsconfig.lib.json"),
      }),
      viteTsConfigPaths({
        root: "../../",
        ignoreConfigErrors: true,
      }),
      nodePolyfills(),
    ],

    build: {
      lib: {
        entry: path.resolve(__dirname, walletConfig.entry),
        name: walletConfig.name,
        fileName: "index",
        formats: ["iife"],
      },
      outDir: walletConfig.outDir,
      rollupOptions: {
        external: [],
      },
    },
  };
});
