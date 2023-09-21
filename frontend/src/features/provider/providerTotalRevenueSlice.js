import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    totalRevenueError: null
}

const providerTotalRevenueSlice = createSlice({
    name: "provider",
    initialState,
    reducers: {
        providerTotalRevenueReq: (state, action) => {
            state.loading = true;
        },
        providerTotalRevenueSuccess: (state, action) => {
            state.loading = false;
            state.totalRevenue = action.payload
        },
        providerTotalRevenueFail: (state, action) => {
            state.loading = false;
            state.totalRevenueError = action.payload
        }
    }
})

export default providerTotalRevenueSlice.reducer
export const { providerTotalRevenueFail, providerTotalRevenueReq, providerTotalRevenueSuccess } = providerTotalRevenueSlice.actions