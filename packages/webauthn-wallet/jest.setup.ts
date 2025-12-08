// Setup file for webauthn-wallet tests
// This runs before the test environment is initialized
import { TextEncoder, TextDecoder } from "util";

// Polyfill TextEncoder/TextDecoder for Node.js environment
// @ts-ignore
global.TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).TextDecoder = TextDecoder;
