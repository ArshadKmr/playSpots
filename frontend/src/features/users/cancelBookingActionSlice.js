import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cancelError: null,
    loading: false,
    cancelBooking: []
}

const cancelBookingActionSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        cancelBookingReq: (state, action) => {
            state.loading = true;
            state.cancelError = null
        },
        cancelBookingSuccess: (state, action) => {
            state.loading = false
            state.cancelBooking = action.payload
        },
        cancelBookingFail: (state, action) => {
            state.loading = false
            state.cancelError = action.payload
        }
    }
})

export default cancelBookingActionSlice.reducer
export const { cancelBookingReq, cancelBookingFail, cancelBookingSuccess } = cancelBookingActionSlice.actions