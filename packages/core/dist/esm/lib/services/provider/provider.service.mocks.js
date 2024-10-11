export const createQueryResponseMock = () => ({
    block_height: 0,
    block_hash: "",
});
export const createViewAccessKeyResponseMock = () => ({
    ...createQueryResponseMock(),
    nonce: 0,
    permission: "FullAccess",
});
