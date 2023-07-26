import axios from "axios";
export const getVendorOrders=(id)=>{
    return axios.get(`${process.env.REACT_APP_OrderUrl}/getVendorOrders/${id}`)
}