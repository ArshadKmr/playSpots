import { createSlice } from "@reduxjs/toolkit";
const singleTurfFromStorage = localStorage.getItem('providerSingleTurf')
    ? JSON.parse(localStorage.getItem('providerSingleTurf'))
    : null

const initialState = {
    singleError: null,
    loading: false,
    singleTurf: singleTurfFromStorage
}

const providerSingleTurf = createSlice({
    name: 'provider',
    initialState,
    reducers: {
        providerSingleTurfReq: (state, action) => {
            state.loading = true;
            state.singleError = null
        },
        providerSingleTurfSuccess: (state, action) => {
            state.loading = false
            state.singleTurf = action.payload
        },
        providerSingleTurfFail: (state, action) => {
            state.loading = false
            state.singleError = action.payload
        }
    }
})


export default providerSingleTurf.reducer
export const { providerSingleTurfReq, providerSingleTurfSuccess, providerSingleTurfFail } = providerSingleTurf.actions