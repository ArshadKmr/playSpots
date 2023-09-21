import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading: false,
    graphError:null,
    graphData:[]
}

const adminUserGraphSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{
        adminUserGraphReq:(state,action)=>{
            state.loading = true;
        },
        adminUserGraphSuccess:(state,action)=>{
            state.loading = false;
            state.graphData=action.payload
        },
        adminUserGraphFail:(state,action)=>{
            state.loading = false;
            state.graphError = action.payload
        }
    }
})

export default adminUserGraphSlice.reducer
export const {adminUserGraphFail,adminUserGraphReq,adminUserGraphSuccess}=adminUserGraphSlice.actions