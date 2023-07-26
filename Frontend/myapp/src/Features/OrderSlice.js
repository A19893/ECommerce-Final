import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  CurrentOrderPlaced:[]
};
export const OrderSlice=createSlice({
    name:'Order',
    initialState:initialState,
    reducers:{
    placedOrder:(state,action)=>{
        state.CurrentOrderPlaced.push(action.payload);
    },
    removeOrder:(state,action)=>{
      state.CurrentOrderPlaced=[];
    }
  }
})
export const {placedOrder,removeOrder}=OrderSlice.actions;
export default OrderSlice.reducer;