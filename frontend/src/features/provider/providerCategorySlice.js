import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    category: [],
    error: null
}

const categoryListSlice = createSlice({
    name: 'provider',
    initialState,
    reducers: {
        categoryListReq: (state, action) => {
            state.loading = true;
            state.error = null
        },
        categoryListSuccess: (state, action) => {
            state.loading = false
            state.category = action.payload
            state.error = null
        },
        categoryListFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})
export default categoryListSlice.reducer
export const { categoryListFail, categoryListSuccess, categoryListReq } = categoryListSlice.actions