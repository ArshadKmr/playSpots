import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userBookedError:null,
    loading:false,
    userBookedTurf:[]
}

const userBookedTurfSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        userBookedTurfReq:(state,action)=>{
            state.loading = true;
            state.userBookedError=null
        },
        userBookedTurfSuccess:(state,action)=>{
            state.loading = false
            state.userBookedTurf=action.payload
        },
        userBookedTurfFail:(state,action)=>{
            state.loading = false
            state.userBookedError=action.payload
        }
    }
})

export default userBookedTurfSlice.reducer
export const {userBookedTurfReq, userBookedTurfSuccess,userBookedTurfFail}=userBookedTurfSlice.actions