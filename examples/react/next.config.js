// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nx/next/plugins/with-nx");

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  // Remove static export for dev mode to allow proper server-side rendering
  // output: "export", // Commented out for dev mode
  // basePath should only be set in production builds, not in dev mode
  // Explicitly set basePath to empty string in dev mode to avoid routing issues
  basePath: "",
  transpilePackages: [
    "@wagmi/core",
    "@wagmi/connectors",
    "@reown/appkit",
    "@reown/appkit-adapter-wagmi",
    "viem",
    "wagmi",
  ],
  // Fix ESM module cache issues with wagmi/viem
  experimental: {
    serverComponentsExternalPackages: [
      "@wagmi/core",
      "@wagmi/connectors",
      "viem",
      "wagmi",
    ],
  },
  webpack: (config, { isServer }) => {
    // Fix ESM module resolution issues
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        "@wagmi/core": "commonjs @wagmi/core",
        "viem": "commonjs viem",
      });
    }
    return config;
  },
};

module.exports = withNx(nextConfig);
