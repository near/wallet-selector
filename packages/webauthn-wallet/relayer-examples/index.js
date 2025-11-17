// To run the relayer server, simply run:
//    export NEAR_SENDER_ACCOUNT_ID=<your funded testnet account, e.g. example.testnet>
//    export NEAR_PRIVATE_KEY=<your account's private key, e.g. ed25519:...>
//    node packages/webauthn-wallet/relayer-examples/index.js

import express from "express";
import swaggerUi from "swagger-ui-express";

import { KeyPairSigner } from "@near-js/signers";
import { baseDecode } from "@near-js/utils";
import { actionCreators, createTransaction } from "@near-js/transactions";
import { JsonRpcProvider } from "@near-js/providers";

// Configuration from environment variables
const PORT = Number(process.env.PORT) || 7090;
const RPC_URL = process.env.NEAR_RPC_URL || "https://test.rpc.fastnear.com";
const SENDER_ACCOUNT_ID = process.env.NEAR_SENDER_ACCOUNT_ID || "";
const PRIVATE_KEY = process.env.NEAR_PRIVATE_KEY || "";
const NETWORK_ID = process.env.NEAR_NETWORK_ID || "testnet";

// Validate required environment variables
if (!SENDER_ACCOUNT_ID || !PRIVATE_KEY) {
  console.error("❌ Configuration errors:");
  if (!SENDER_ACCOUNT_ID) console.error("  - NEAR_SENDER_ACCOUNT_ID is required");
  if (!PRIVATE_KEY) console.error("  - NEAR_PRIVATE_KEY is required");
  console.error("\nPlease set the required environment variables.");
  process.exit(1);
}

const provider = new JsonRpcProvider({ url: RPC_URL });
const signer = KeyPairSigner.fromSecretKey(PRIVATE_KEY);

// NEAR helper functions
async function getAccessKeyNonce(publicKey) {
  const accessKeyResponse = await provider.query({
    request_type: "view_access_key",
    public_key: publicKey.toString(),
    finality: "final",
    account_id: SENDER_ACCOUNT_ID,
  });
  if (!accessKeyResponse) {
    throw new Error("Failed to get access key nonce");
  }
  return (accessKeyResponse).nonce + 1;
}

async function getRecentBlockHash() {
  const recentBlock = await provider.block({ finality: "final" });
  if (!recentBlock) {
    throw new Error("Failed to get recent block hash");
  }
  return baseDecode(recentBlock.header.hash);
}

async function accountExists(accountId) {
  try {
    const account = await provider.query({
      request_type: "view_account",
      finality: "final",
      account_id: accountId,
    });
    return !!account;
  } catch (error) {
    return false;
  }
}

async function createAccount(accountId, publicKey) {
  try {
    const signerPublicKey = await signer.getPublicKey();
    const [nonce, blockHash] = await Promise.all([
      getAccessKeyNonce(signerPublicKey),
      getRecentBlockHash(),
    ]);

    const actions = [
      actionCreators.functionCall(
        "create_account",
        {
          new_account_id: accountId,
          new_public_key: publicKey,
        },
        300000000000000n,
        BigInt(parseNearAmount("0.1")) // Fund the new account with 0.1 NEAR
      ),
    ];
    const transaction = createTransaction(
      SENDER_ACCOUNT_ID,
      signerPublicKey,
      NETWORK_ID,
      nonce,
      actions,
      blockHash
    );

    const [, signedTransaction] = await signer.signTransaction(transaction);

    console.log(`📤 Sending transaction to create account: ${accountId}`);
    const result = await provider.sendTransaction(signedTransaction);

    return result;
  } catch (error) {
    console.error("❌ Error in createAccount:", error);
    throw error;
  }
}

// Create Express app
const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Swagger OpenAPI specification
const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "NEAR Account Creation API",
    version: "1.0.0",
    description: "Minimal Express server for creating NEAR accounts",
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: "Development server",
    },
  ],
  paths: {
    "/create-account": {
      post: {
        summary: "Create a new NEAR account",
        tags: ["Account"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["accountId", "publicKey"],
                properties: {
                  accountId: {
                    type: "string",
                    description: "NEAR account ID (2-64 characters, lowercase letters, digits, or separators)",
                    example: "example.testnet",
                  },
                  publicKey: {
                    type: "string",
                    description: "Public key in format ed25519:base58encodedkey",
                    example: "ed25519:7PGseFbWxvYVgZ89K1uTJKYoKetWs7BJtbyXDzfbAcqG",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Account created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    transactionHash: { type: "string" },
                    result: { type: "object" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad request - validation error or account exists",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", default: false },
                    message: { type: "string" },
                    error: { type: "object" },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", default: false },
                    message: { type: "string" },
                    error: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

// Setup Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "NEAR Account Creation API",
    version: "1.0.0",
    endpoints: {
      docs: "GET /api-docs",
      createAccount: "POST /create-account",
    },
    environment: {
      network: NETWORK_ID,
      senderAccount: SENDER_ACCOUNT_ID,
    },
  });
});

// Create account endpoint
app.post("/create-account", async (req, res) => {
  try {
    const { accountId, publicKey } = req.body;

    // Validation
    if (!accountId) {
      return res.status(400).json({
        success: false,
        message: "accountId is required",
      });
    }

    if (!publicKey) {
      return res.status(400).json({
        success: false,
        message: "publicKey is required",
      });
    }

    const validation = false
    if (validation) {
      // Add accountId and publicKey validation here
    }

    // Check if account already exists
    console.log(`📝 Checking if account exists: ${accountId}`);
    const exists = await accountExists(accountId);
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Account already exists",
      });
    }

    // Create account
    console.log(`📝 Creating account: ${accountId}`);
    const result = await createAccount(accountId, publicKey);

    if (result.result?.status?.Failure) {
      return res.status(400).json({
        success: false,
        message: "Transaction failed",
        error: result.result.status.Failure,
      });
    }

    console.log(`✅ Account created successfully: ${accountId}`);

    res.json({
      success: true,
      message: "Account created successfully",
      transactionHash: result.result?.transaction?.hash,
      result: result.result,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 Server running at http://localhost:${PORT}
📡 NEAR Network: ${NETWORK_ID}
🔑 Sender Account: ${SENDER_ACCOUNT_ID}
📚 API Docs: http://localhost:${PORT}/api-docs
`);
});

