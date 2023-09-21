import { createSlice } from "@reduxjs/toolkit";

const singleTurfFromStorage = localStorage.getItem('singleTurf')
    ? JSON.parse(localStorage.getItem('singleTurf'))
    : null

const initialState = {
    error: null,
    singleTurf: singleTurfFromStorage,
    loading: false
}

const userTurfDetailSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        turfDetailReq: (state, action) => {
            state.loading = true;
            state.error = null
        },
        turfDetailSuccess: (state, action) => {
            state.loading = false
            state.singleTurf = action.payload
        },
        turfDetailFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})


export default userTurfDetailSlice.reducer
export const { turfDetailFail, turfDetailReq, turfDetailSuccess } = userTurfDetailSlice.actions