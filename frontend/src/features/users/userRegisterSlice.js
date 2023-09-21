import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: true
}

const userRegisterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userRegisterReq: (state, action) => {
            state.loading = true;
        },
        userRegisterSuccess: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        },
        userRegisterFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export default userRegisterSlice.reducer;
export const { userRegisterReq, userRegisterSuccess, userRegisterFail } = userRegisterSlice.actions