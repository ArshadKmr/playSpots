import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    barGraphData:[],
    barGraphError:null
}

const adminBookingGraphSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{
        adminBookingGraphReq:(state,action)=>{
            state.loading = true;
        },
        adminBookingGraphSuccess:(state,action)=>{
            state.loading = false;
            state.barGraphData=action.payload
        },
        adminBookingGraphFail:(state,action)=>{
            state.loading = false;
            state.barGraphError=action.payload
        }
    }
})

export default adminBookingGraphSlice.reducer
export const {adminBookingGraphFail,adminBookingGraphReq,adminBookingGraphSuccess}=adminBookingGraphSlice.actions