import axios from "axios"
export const getSpecificProduct=(id)=>{
    return axios.get(`${process.env.REACT_APP_ProductUrl}/specificProduct/${id}`);
}