import axios from "axios";
export const getAllVendors=()=>{
    return axios.get(`${process.env.REACT_APP_UserUrl}/getAllVendors`);
}