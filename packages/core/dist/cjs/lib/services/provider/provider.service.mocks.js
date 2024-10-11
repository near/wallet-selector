"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createViewAccessKeyResponseMock = exports.createQueryResponseMock = void 0;
const createQueryResponseMock = () => ({
    block_height: 0,
    block_hash: "",
});
exports.createQueryResponseMock = createQueryResponseMock;
const createViewAccessKeyResponseMock = () => ({
    ...(0, exports.createQueryResponseMock)(),
    nonce: 0,
    permission: "FullAccess",
});
exports.createViewAccessKeyResponseMock = createViewAccessKeyResponseMock;
