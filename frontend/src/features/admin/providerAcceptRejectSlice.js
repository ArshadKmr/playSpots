import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loadingAction: false,
    errorAction: null
}

const providerAcceptRejectSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        providerAcceptRejectReq: (state, action) => {
            state.loadingAction = true;
            state.success = false
        },
        providerAcceptRejectSuccess: (state, action) => {
            state.loadingAction = false;
            state.providerAction = action.payload
            state.success = true
        },
        providerAcceptRejectFail: (state, action) => {
            state.loadingAction = false
            state.errorAction = action.payload
            state.success = false
        }
    }
})

export default providerAcceptRejectSlice.reducer
export const {
    providerAcceptRejectFail,
    providerAcceptRejectSuccess,
    providerAcceptRejectReq
} = providerAcceptRejectSlice.actions