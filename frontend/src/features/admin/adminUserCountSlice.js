import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    userCountError: null
}

const adminUserCountSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminUserCountReq: (state, action) => {
            state.loading = true;
        },
        adminUserCountSuccess: (state, action) => {
            state.loading = false;
            state.userCount = action.payload
        },
        adminUserCountFail: (state, action) => {
            state.loading = false;
            state.userCountError = action.payload
        }
    }
})

export default adminUserCountSlice.reducer
export const { adminUserCountFail, adminUserCountReq, adminUserCountSuccess } = adminUserCountSlice.actions