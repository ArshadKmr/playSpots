import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    providerCountError: null
}

const adminProviderCountSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminProviderCountReq: (state, action) => {
            state.loading = true;
        },
        adminProviderCountSuccess: (state, action) => {
            state.loading = false;
            state.providerCount = action.payload
        },
        adminProviderCountFail: (state, action) => {
            state.loading = false;
            state.providerCountError = action.payload
        }
    }
})

export default adminProviderCountSlice.reducer
export const { adminProviderCountFail, adminProviderCountReq, adminProviderCountSuccess } = adminProviderCountSlice.actions