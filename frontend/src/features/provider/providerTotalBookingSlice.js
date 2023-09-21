import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    totalBookingError: null,
    totalBooking: []
}

const providerTotalBookingSlice = createSlice({
    name: 'provider',
    initialState,
    reducers: {
        providerTotalBookingReq: (state, action) => {
            state.loading = true
        },
        providerTotalBookingSuccess: (state, action) => {
            state.loading = false
            state.totalBooking = action.payload
        },
        providerTotalBookingFail: (state, action) => {
            state.loading = false
            state.totalBookingError = action.payload
        }
    }
})

export default providerTotalBookingSlice.reducer
export const { providerTotalBookingFail, providerTotalBookingReq, providerTotalBookingSuccess } = providerTotalBookingSlice.actions