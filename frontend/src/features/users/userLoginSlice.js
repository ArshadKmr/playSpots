import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    loading: false,
    userInfo: userInfoFromStorage,
    error: null
}

const userLoginSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        userLoginReq:(state,action)=>{
            state.loading = true;
        },
        userLoginSuccess:(state,action)=>{
            state.loading = false;
            state.userInfo = action.payload
            state.loginSuccess= true
        },
        userLoginFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload
            state.loginSuccess= false
        },
        userLogout:(state,action)=>{
            state.error = null;
            state.userInfo=null
        }
    }
})

export default userLoginSlice.reducer;
export const {
    userLoginReq,
    userLoginSuccess,
    userLoginFail,
    userLogout,
} = userLoginSlice.actions