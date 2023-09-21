import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null
}

const providerTurfSlice = createSlice({
    name: 'provider',
    initialState,
    reducers: {
        addTurfReq: (state, action) => {
            state.loading = true;
        },
        addTurfSuccess: (state, action) => {
            state.loading = false;
            state.providerTurf = action.payload
            state.error=null
        },
        addTurfFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})

export default providerTurfSlice.reducer
export const {addTurfFail,addTurfReq,addTurfSuccess}=providerTurfSlice.actions