import axios from 'axios'
export const getMyOrders=(id)=>{
    return axios.get(`${process.env.REACT_APP_OrderUrl}/getMyOrders/${id}`)
}