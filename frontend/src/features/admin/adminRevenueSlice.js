import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    revenueError: null
}

const adminRevenueSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminRevenueReq: (state, action) => {
            state.loading = true;
        },
        adminRevenueSuccess: (state, action) => {
            state.loading = false;
            state.revenue = action.payload
        },
        adminRevenueFail: (state, action) => {
            state.loading = false;
            state.revenueError = action.payload
        }
    }
})

export default adminRevenueSlice.reducer
export const { adminRevenueFail, adminRevenueReq, adminRevenueSuccess } = adminRevenueSlice.actions