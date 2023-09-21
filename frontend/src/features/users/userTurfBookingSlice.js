import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookingError: null,
    loading: false,
    bookingTurf: []
}

const userTurfBookingSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        turfBookingReq: (state, action) => {
            state.loading = true;
            state.bookingError = null
        },
        turfBookingSuccess: (state, action) => {
            state.loading = false
            state.bookingTurf = action.payload
        },
        turfBookingFail: (state, action) => {
            state.loading = false
            state.bookingError = action.payload
        }
    }
})

export default userTurfBookingSlice.reducer
export const { turfBookingFail, turfBookingReq, turfBookingSuccess } = userTurfBookingSlice.actions