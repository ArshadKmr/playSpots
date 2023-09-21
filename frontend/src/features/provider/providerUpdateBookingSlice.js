import { createSlice } from "@reduxjs/toolkit";

const initialState={
    updateError:null,
    loading:false,
    updateBooking:[]
}

const providerUpdateBookingSlice=createSlice({
    name:'provider',
    initialState,
    reducers:{
        updateBookingReq:(state,action)=>{
            state.loading = true;
            state.updateError=null
        },
        updateBookingSuccess:(state,action)=>{
            state.loading = false;
            state.updateBooking=action.payload
        },
        updateBookingFail:(state,action)=>{
            state.loading = false;
            state.updateError=action.payload
        }
    }
})


export default providerUpdateBookingSlice.reducer
export const {updateBookingReq, updateBookingSuccess, updateBookingFail}=providerUpdateBookingSlice.actions