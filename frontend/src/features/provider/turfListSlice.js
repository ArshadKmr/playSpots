import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: null,
    turf: [],
    loading: false
}


const turfListSlice = createSlice({
    name: 'provider',
    initialState,
    reducers: {
        turfListReq: (state, action) => {
            state.loading = true;
            state.error = null
        },
        turfListSuccess: (state, action) => {
            state.loading = false
            state.turf = action.payload
            state.error = null
        },
        turfListFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export default turfListSlice.reducer
export const { turfListFail, turfListReq, turfListSuccess } = turfListSlice.actions