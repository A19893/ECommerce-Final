import axios from 'axios'
export const getAllOrders=()=>{
return axios.get(`${process.env.REACT_APP_OrderUrl}/getAllOrders`);
}