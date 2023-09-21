import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    category: [],
    error: null
}

const categoryListSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        categoryListReq: (state, action) => {
            state.loading = true
        },
        categoryListSuccess: (state, action) => {
            state.loading = false
            state.category = action.payload
        },
        categoryListFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export default categoryListSlice.reducer
export const { categoryListReq, categoryListSuccess, categoryListFail } = categoryListSlice.actions