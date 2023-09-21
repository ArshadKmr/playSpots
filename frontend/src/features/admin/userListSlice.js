import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    users: [],
    error: null,
};

const usersListSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        usersListReq: (state, action) => {
            state.loading = true;
        },
        usersListSuccess: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        usersListFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default usersListSlice.reducer;
export const {
    usersListReq,
    usersListSuccess,
    usersListFail,
} = usersListSlice.actions;
