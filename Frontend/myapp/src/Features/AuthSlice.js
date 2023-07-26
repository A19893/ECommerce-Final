import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuth: false,
  loggedInUserRole: null,
  loggedinUserEmail: null,
  loggedinUserId: null,
  loggedInUserAddress: null,
  loggedInUserName:null, 
  loggedInUserCountry:null,
  loggedInUserState:null
};
export const AuthSlice = createSlice({
  name: "Authentication",
  initialState: initialState,
  reducers: {
    addAuthentication: (state, action) => {
      state.isAuth = true;
      state.loggedinUserEmail = action.payload.email;
      state.loggedinUserId = action.payload.id;
       state.loggedInUserAddress = action.payload.address;
       state.loggedInUserState=action.payload.state;
       state.loggedInUserCountry=action.payload.country
       state.loggedInUserName=action.payload.name;
    },
    selectRole: (state, action) => {
      state.loggedInUserRole = action.payload;
    },
    removeAuthentication: (state, action) => {
      state.isAuth = false;
      state.loggedInUserRole = null;
      state.loggedinUserEmail = null;
      state.loggedinUserId = null;
      state.loggedInUserAddress=null;
      state.loggedInUserName=null;
      state.loggedInUserCountry=null;
      state.loggedInUserState=null;
    },
    selectAddress: (state, action) => {
       state.loggedInUserAddress = action.payload;
    },
    setReduxAddress:(state,action)=>{
      console.log(action);
    state.loggedInUserAddress=action.payload.address;
    state.loggedInUserState=action.payload.states;
    state.loggedInUserCountry=action.payload.country
    }
  },
});
export const {
  addAuthentication,
  selectRole,
  removeAuthentication,
  selectAddress,
  setReduxAddress
} = AuthSlice.actions;
export default AuthSlice.reducer;
