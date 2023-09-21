import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    turf:[],
    error:null
}


const userTurfSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        listTurfReq:(state,action)=>{
            state.loading = true;
            state.error=null
        },
        listTurfSuccess:(state,action)=>{
            state.loading = false;
            state.turf=action.payload
            state.error=null
        },
        listTurfFail:(state,action)=>{
            state.loading = false;
            state.error=action.payload
        }
    }
})


export default userTurfSlice.reducer
export const {listTurfFail, listTurfSuccess, listTurfReq}=userTurfSlice.actions 