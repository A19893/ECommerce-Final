import axios from "axios";
export const getCartItems=()=>{
return axios.get(`${process.env.REACT_APP_CartUrl}/getCartItems`);
}