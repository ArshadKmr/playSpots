import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    walletBookError: null,
    walletBookSuccess: []
}

const turfBookingWalletSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        bookTurfWalletReq: (state, action) => {
            state.loading = true;
        },
        bookTurfWalletSuccess: (state, action) => {
            state.loading = false;
            state.walletBookSuccess = action.payload
        },
        bookTurfWalletFail: (state, action) => {
            state.loading = false;
            state.walletBookError = action.payload
        }
    }
})

export default turfBookingWalletSlice.reducer
export const { bookTurfWalletFail, bookTurfWalletSuccess, bookTurfWalletReq } = turfBookingWalletSlice.actions