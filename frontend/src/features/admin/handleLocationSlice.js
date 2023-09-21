import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error:null,
    loading:false
}

const handleLocationSlice=createSlice({
    name:"admin",
    initialState,
    reducers:{
        handleLocationReq:(state,action)=>{
            state.loading=true
        },
        handleLocationSuccess:(state,action)=>{
            state.loading=false
            state.updateLocation=action.payload
        },
        handleLocationFail:(state,action)=>{
            state.loading=false
            state.error=action.payload
        }
    }
})

export default handleLocationSlice.reducer
export const {handleLocationSuccess,handleLocationFail,handleLocationReq}=handleLocationSlice.actions