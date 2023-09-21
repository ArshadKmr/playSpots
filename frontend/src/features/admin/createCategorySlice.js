import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error:null
}

const createCategorySlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        createCategoryReq: (state, action) => {
            state.loading = true;
        },
        createCategorySuccess: (state, action) => {
            state.loading = false;
            state.categoryInfo = action.payload;
        },
        createCategoryFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export default createCategorySlice.reducer;
export const {
    createCategoryFail,
    createCategoryReq, createCategorySuccess
} = createCategorySlice.actions