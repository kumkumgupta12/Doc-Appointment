import {createSlice} from '@reduxjs/toolkit'

//create  a slice as object
export const userSlice = createSlice({
    name: 'user',
    initialState:{
        user:null
    },
    reducers:{
        setUser: (state, action) =>{
            //intial stae ko fullfill krenge, 
            //access initial state using state.user and fullfill using .payload
            state.user = action.payload
        }
    }
})

export const {setUser} = userSlice.actions;