import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  CartItems:null
};
export const CartSlice=createSlice({
    name:'Cart',
    initialState:initialState,
    reducers:{
    addCartItems:(state,action)=>{
        state.CartItems=action.payload;
    },
    removeReduxCart:(state,action)=>{
      state.CartItems=null;
    }
  }
})
export const {addCartItems,removeReduxCart}=CartSlice.actions;
export default CartSlice.reducer;