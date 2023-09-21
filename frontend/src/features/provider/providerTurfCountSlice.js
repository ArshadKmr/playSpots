import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    turfCountError: null,
    turfCount: []
}

const providerTurfCountSlice = createSlice({
    name: 'provider',
    initialState,
    reducers: {
        providerTurfCountReq: (state, action) => {
            state.loading = true;
        },
        providerTurfCountSuccess: (state, action) => {
            state.loading = false;
            state.turfCount = action.payload
        },
        providerTurfCountFail: (state, action) => {
            state.loading = false;
            state.turfCountError = action.payload
        }
    }
})

export default providerTurfCountSlice.reducer
export const { providerTurfCountFail, providerTurfCountReq, providerTurfCountSuccess } = providerTurfCountSlice.actions