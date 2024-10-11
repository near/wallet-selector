export const getActiveAccount = (state) => {
    return state.accounts.find((account) => account.active) || null;
};
