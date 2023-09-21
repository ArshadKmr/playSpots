import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading: false,
    location:[],
    error:null
}

const providerLocationSlice=createSlice({
    name:'provider',
    initialState,
    reducers:{
        locationListReq:(state,action)=>{
            state.loading = true;
        },
        locationListSuccess:(state,action)=>{
            state.loading = false;
            state.location=action.payload
        },
        locationListFail:(state,action)=>{
            state.loading=false
            state.error = action.payload
        }
    }
})

export default providerLocationSlice.reducer
export const {locationListFail,locationListReq,locationListSuccess}=providerLocationSlice.actions