import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filterError: null,
    loading: true,
    filteredTurf: []
}


const userFilterTurfSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        filterTurfReq: (state, action) => {
            state.loading = true;
            state.filterError = null
        },
        filterTurfSuccess: (state, action) => {
            state.loading = false
            state.filteredTurf = action.payload
        },
        filterTurfFail: (state, action) => {
            state.loading = false
            state.filterError = action.payload
        }
    }
})

export default userFilterTurfSlice.reducer
export const { filterTurfReq, filterTurfFail, filterTurfSuccess } = userFilterTurfSlice.actions