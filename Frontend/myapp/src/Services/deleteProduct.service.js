import axios from "axios";
export const deleteProduct=(id)=>{
    return axios.post(`${process.env.REACT_APP_ProductUrl}/deleteProduct/${id}`);
}