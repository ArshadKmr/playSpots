import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    walletAmountError: null,
    userWalletAmount: []
}

const getWalletAmountSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getWalletAmountReq: (state, action) => {
            state.loading = true;
            state.walletAmountError = null
        },
        getWalletAmountSuccess: (state, action) => {
            state.loading = false
            state.userWalletAmount = action.payload;
        },
        getWalletAmountFail: (state, action) => {
            state.loading = false
            state.walletAmountError = action.payload
        }
    }
})

export default getWalletAmountSlice.reducer
export const { getWalletAmountFail, getWalletAmountReq, getWalletAmountSuccess } = getWalletAmountSlice.actions