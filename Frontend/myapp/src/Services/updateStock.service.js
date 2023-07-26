import axios from "axios";
export const updateProduct=(id,Stock)=>{
     return axios.put(`${process.env.REACT_APP_ProductUrl}/updateProduct/${id}`,{Stock});
}