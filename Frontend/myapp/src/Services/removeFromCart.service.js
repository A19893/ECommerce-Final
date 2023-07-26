import axios from "axios";
export const removeCartItems=(orderItems)=>{
    return axios.post(`${process.env.REACT_APP_CartUrl}/removeCart`,orderItems);
}