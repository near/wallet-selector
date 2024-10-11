interface RetryOptions {
    retries?: number;
    interval?: number;
}
export declare const retry: <Value>(func: () => Promise<Value>, opts?: RetryOptions) => Promise<Value>;
export {};
//# sourceMappingURL=retry.d.ts.map