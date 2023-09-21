import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getUserError: null,
    loading: false,
    getUserList: []
}

const getChatUserListSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserReq: (state, action) => {
            state.loading = true;
            state.getUserError = null
        },
        getUserSuccess: (state, action) => {
            state.loading = false;
            state.getUserList = action.payload
        },
        getUserFail: (state, action) => {
            state.loading = false;
            state.getUserError = action.payload
        }
    }
})


export default getChatUserListSlice.reducer
export const { getUserSuccess, getUserFail, getUserReq } = getChatUserListSlice.actions