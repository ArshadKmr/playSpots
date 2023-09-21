import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null
}

const handleCategorySlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        handleCategoryReq: (state, action) => {
            state.loading = true;
            state.error = null
        },
        handleCategorySuccess: (state, action) => {
            state.loading = false;
            state.updatedCategory = action.payload
            state.error = null
        },
        handleCategoryFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})

export default handleCategorySlice.reducer
export const { handleCategoryFail, handleCategoryReq, handleCategorySuccess } = handleCategorySlice.actions