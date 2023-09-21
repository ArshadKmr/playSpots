import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userError:null,
    updatedUser:null,
    loading:false
}


const handleUserSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{
        handleUserReq:(state,action)=>{
            state.loading = true;
            state.userError =null
        },
        handleUserSuccess:(state,action)=>{
            state.loading = false
            state.updatedUser=action.payload
        },
        handleUserFail:(state,action)=>{
            state.loading = false
            state.userError = action.payload
        }
    }
})

export default handleUserSlice.reducer
export const {handleUserFail, handleUserSuccess, handleUserReq}=handleUserSlice.actions