import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    adminBookingsError: null,
    adminBookings: []
}

const adminTotalBookingSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminTotalBookingsReq: (state, action) => {
            state.loading = true;
        },
        adminTotalBookingSuccess: (state, action) => {
            state.loading = false;
            state.adminBookings = action.payload
        },
        adminTotalBookingsFail: (state, action) => {
            state.loading = false;
            state.adminBookingsError = action.payload
        }
    }
})

export default adminTotalBookingSlice.reducer
export const { adminTotalBookingsReq, adminTotalBookingSuccess, adminTotalBookingsFail } = adminTotalBookingSlice.actions