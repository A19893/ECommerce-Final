import axios from "axios";
export const getVendorProduct=(id)=>{
    return axios.get(`${process.env.REACT_APP_ProductUrl}/getVendorProducts/${id}`)
}