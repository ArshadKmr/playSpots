import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    searchedTurf: [],
    searchError: null
}

const userSearchTurfSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        searchTurfReq: (state, action) => {
            state.loading = true;
            state.searchError = null
        },
        searchTurfSuccess: (state, action) => {
            state.loading = false
            state.searchedTurf = action.payload
            state.searchError = null
        }, searchTurfFail: (state, action) => {
            state.loading = false
            state.searchError = action.payload
        }
    }
})

export default userSearchTurfSlice.reducer
export const { searchTurfFail, searchTurfReq, searchTurfSuccess } = userSearchTurfSlice.actions