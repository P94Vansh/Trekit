import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name:'vansh',
  email:'',
  password:''
}

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
    clearName:(state)=>{
        state.name=''
    },
    clearEmail:(state)=>{
        state.email=''
    },
    clearPassword:(state)=>{
        state.password=''
    }
  },
})

// Action creators are generated for each case reducer function
export const { clearName, clearEmail, clearPassword } = signupSlice.actions

export default signupSlice.reducer