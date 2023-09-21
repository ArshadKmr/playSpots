import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getChatError: null,
    loading: false,
    getChatMessages: []
}

const getChatMessagesSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getChatReq: (state, action) => {
            state.loading = true;
            state.getChatError = null
        },
        getChatSuccess: (state, action) => {
            state.loading = false;
            state.getChatMessages = action.payload
        },
        getChatFail: (state, action) => {
            state.loading = false;
            state.getChatError = action.payload
        }
    }
})

export default getChatMessagesSlice.reducer
export const { getChatFail, getChatSuccess, getChatReq } = getChatMessagesSlice.actions