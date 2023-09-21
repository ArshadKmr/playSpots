import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    turfList: [],
    turfError: null
}

const turfListSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminTurfReq: (state, action) => {
            state.loading = true;
            state.turfError = null
        },
        adminTurfSuccess: (state, action) => {
            state.loading = false;
            state.turfList = action.payload
            state.turfError = null
        },
        adminTurfFail: (state, action) => {
            state.loading = false;
            state.turfError = action.payload
        }
    }
})


export default turfListSlice.reducer
export const { adminTurfFail, adminTurfReq, adminTurfSuccess } = turfListSlice.actions