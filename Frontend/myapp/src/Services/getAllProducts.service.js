import axios from "axios";
export const getAllProducts=()=>{
    return axios.get(`${process.env.REACT_APP_ProductUrl}/getProducts`);
}