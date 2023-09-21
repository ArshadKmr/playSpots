import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookedError: null,
    loading: false,
    bookedTurf: []
}


const turfIsBookedSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        isBookedReq: (state, action) => {
            state.loading = true
            state.bookedError = null
        },
        isBookedSuccess: (state, action) => {
            state.loading = false
            state.bookedTurf = action.payload
        },
        isBookedFail: (state, action) => {
            state.loading = false
            state.bookedError = action.payload
        }
    }
})

export default turfIsBookedSlice.reducer
export const { isBookedFail, isBookedReq, isBookedSuccess } = turfIsBookedSlice.actions