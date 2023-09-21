import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null
}

const createLocationSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        addLocationReq: (state, action) => {
            state.loading = true;
        },
        addLocationSuccess: (state, action) => {
            state.loading = false;
            state.locationInfo = action.payload
        },
        addLocationFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})

export default createLocationSlice.reducer
export const { addLocationFail, addLocationReq, addLocationSuccess } = createLocationSlice.actions