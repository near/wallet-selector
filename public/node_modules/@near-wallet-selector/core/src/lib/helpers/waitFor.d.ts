export declare const waitFor: (cb: () => boolean, opts?: {
    timeout?: number;
    interval?: number;
}) => Promise<boolean>;
