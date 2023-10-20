import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    loading:false,
    error:null
    
}
const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload
            state.loading=false
            state.error=null
        },
        signInFaliure:(state,action)=>{

            state.error=action.payload
            state.loading=false
        },
        updateStart:(state)=>{
            state.loading=true
        },
        updateSuccess:(state,action)=>{
            state.currentUser=action.payload
            state.loading=false
            state.error=null
        },
        updateFaliure:(state,action)=>{

            state.error=action.payload
            state.loading=false
        },

        deleteStart:(state)=>{
            state.loading=true
        },
        deleteSuccess:(state,action)=>{
            state.currentUser=null
            state.loading=false
            state.error=null
        },
       deleteFaliure:(state,action)=>{

            state.error=action.payload
            state.loading=false
        },
        

        signOutStart:(state)=>{
            state.loading=true
        },
        signOutSuccess:(state,action)=>{
            state.currentUser=null
            state.loading=false
            state.error=null
        },
       signOutFaliure:(state,action)=>{

            state.error=action.payload
            state.loading=false
        },
        
    }
})
export const {signInStart,signInSuccess, signInFaliure,updateFaliure,updateStart,updateSuccess,deleteStart,deleteSuccess,deleteFaliure,signOutStart,signOutSuccess,signOutFaliure} =userSlice.actions
export default userSlice.reducer