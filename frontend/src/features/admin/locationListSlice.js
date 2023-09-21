import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading: false,
    location:[],
    error:null
}

const locationListSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{
        locationListReq:(state,action)=>{
            state.loading=true
        },
        locationListSuccess:(state,action)=>{
            state.loading=false
            state.location=action.payload
        },
        locationListFail:(state,action)=>{
            state.loading=false
            state.error=action.payload
        }
    }
})

export default locationListSlice.reducer
export const{locationListReq,locationListSuccess,locationListFail}=locationListSlice.actions