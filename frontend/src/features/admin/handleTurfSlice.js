import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    handleError: null,
    updatedTurf: [],
    loading: false
}

const handleTurfSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        handleTurfReq: (state, action) => {
            state.loading = true;
            state.handleError = null
        },
        handleTurfSuccess: (state, action) => {
            state.loading = false
            state.handleError = null
            state.updatedTurf = action.payload
        },
        handleTurfFail: (state, action) => {
            state.loading = false
            state.handleError = action.payload
        }
    }
})


export default handleTurfSlice.reducer
export const { handleTurfSuccess, handleTurfFail, handleTurfReq } = handleTurfSlice.actions