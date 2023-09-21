import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    providers: [],
    error: null,
};

const providersListSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        providersListReq: (state, action) => {
            state.loading = true;
        },
        providersListSuccess: (state, action) => {
            state.loading = false;
            state.providers = action.payload;
        },
        providersListFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default providersListSlice.reducer;
export const {
    providersListReq,
    providersListSuccess,
    providersListFail,
} = providersListSlice.actions;
