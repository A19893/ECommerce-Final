import axios from "axios";
export const  updateOrder=(id,orderStatus)=>{
return axios.put(`${process.env.REACT_APP_OrderUrl}/updateOrder/${id}`,{orderStatus});
}