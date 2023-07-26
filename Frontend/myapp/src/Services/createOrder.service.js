import axios from 'axios'
export const createOrder=(shippingInfo,order,user,Quantity,subTotal)=>{
    return axios.post(`${process.env.REACT_APP_OrderUrl}/createOrder`,{shippingInfo,order,user,Quantity,subTotal})
}