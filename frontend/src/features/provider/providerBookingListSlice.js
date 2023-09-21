import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    bookingError: null,
    loading: false,
    bookingList: []
}

const providerBookingListSlice = createSlice({
    name: 'provider',
    initialState,
    reducers: {
        providerBookingListReq: (state, action) => {
            state.loading = true;
            state.bookingError = null
        },
        providerBookingListSuccess: (state, action) => {
            state.loading = false;
            state.bookingList = action.payload
        },
        providerBookingListFail: (state, action) => {
            state.loading = false;
            state.bookingError = action.payload
        }
    }
})


export default providerBookingListSlice.reducer
export const { providerBookingListFail, providerBookingListReq, providerBookingListSuccess } = providerBookingListSlice.actions