import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sendMessageError: null,
    loading: false,
    sendMessageSuccess: []
}

const sendMessageSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        sendMessageReq: (state, action) => {
            state.loading = true
            state.sendMessageError = null
        },
        sendMessageSuccess: (state, action) => {
            state.loading = false
            state.sendMessageSuccess = action.payload
        },
        sendMessageFail: (state, action) => {
            state.loading = false
            state.sendMessageError = action.payload
        }
    }
})

export default sendMessageSlice.reducer
export const { sendMessageFail, sendMessageReq, sendMessageSuccess } = sendMessageSlice.actions