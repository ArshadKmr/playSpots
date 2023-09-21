import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    walletError:null,
    userWallet:[]
}

const getWalletStore = createSlice({
    name:'user',
    initialState,
    reducers:{
        getWalletReq:(state,action)=>{
            state.loading = true;
            state.walletError =null
        },
        getWalletSuccess:(state,action)=>{
            state.loading = false
            state.userWallet=action.payload
        },
        getWalletFail:(state,action)=>{
            state.loading=false
            state.walletError =action.payload
        }
    }
})

export default getWalletStore.reducer
export const {getWalletReq,getWalletFail,getWalletSuccess}=getWalletStore.actions