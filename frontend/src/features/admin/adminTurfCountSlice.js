import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    turfCountError: null,
    turfCount: []
}

const adminTurfCountSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminTurfCountReq: (state, action) => {
            state.loading = true;
        },
        adminTurfCountSuccess: (state, action) => {
            state.loading = false;
            state.turfCount = action.payload
        },
        adminTurfCountFail: (state, action) => {
            state.loading = false;
            state.turfCountError = action.payload
        }
    }
})

export default adminTurfCountSlice.reducer
export const { adminTurfCountFail, adminTurfCountReq, adminTurfCountSuccess } = adminTurfCountSlice.actions