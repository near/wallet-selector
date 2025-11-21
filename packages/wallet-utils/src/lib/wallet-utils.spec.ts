import { signTransactions, LegacySigner } from "./wallet-utils";
import * as SignTransactionsModule from "./sign-transactions";

describe("wallet-utils", () => {
  it("should export signTransactions function", () => {
    expect(signTransactions).toBeDefined();
    expect(typeof signTransactions).toBe("function");
  });

  it("should export LegacySigner class", () => {
    expect(LegacySigner).toBeDefined();
    expect(LegacySigner).toBe(SignTransactionsModule.LegacySigner);
  });

  it("should export the same signTransactions as the source module", () => {
    expect(signTransactions).toBe(SignTransactionsModule.signTransactions);
  });
});
