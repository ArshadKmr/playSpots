import { createSlice } from "@reduxjs/toolkit";

const providerInfoFromStorage = localStorage.getItem('providerInfo')
    ? JSON.parse(localStorage.getItem('providerInfo'))
    : null

const initialState = {
    loading: false,
    providerInfo: providerInfoFromStorage,
    error: null
}

const providerLoginSlice = createSlice({
    name:"provider",
    initialState,
    reducers:{
        providerLoginReq:(state,action)=>{
            state.loading = true;
        },
        providerLoginSuccess:(state,action)=>{
            state.loading = false;
            state.providerInfo = action.payload
            state.loginSuccess= true
        },
        providerLoginFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload
            state.loginSuccess= false
        },
        providerLogout:(state,action)=>{
            state.error = null;
            state.providerInfo=null
        }
    }
})

export default providerLoginSlice.reducer;
export const {
    providerLoginReq,
    providerLoginSuccess,
    providerLoginFail,
    providerLogout,
} = providerLoginSlice.actions