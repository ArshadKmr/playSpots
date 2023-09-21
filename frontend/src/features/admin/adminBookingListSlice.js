import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookingListLoaded: [],
    loading: false,
    bookingListError: null
}

const adminBookingListSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminBookingListReq: (state, action) => {
            state.loading = true;
            state.bookingListError = null
        },
        adminBookingListSuccess: (state, action) => {
            state.loading = false;
            state.bookingListLoaded = action.payload
        },
        adminBookingListFail: (state, action) => {
            state.loading = false;
            state.bookingListError = action.payload
        }
    }
})

export default adminBookingListSlice.reducer
export const {adminBookingListFail,adminBookingListReq,adminBookingListSuccess}=adminBookingListSlice.actions