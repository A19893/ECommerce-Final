import axios from "axios" 
export const addToCart=(Order,Quantity,PurchasedBy)=>{
    console.log("purchase",PurchasedBy)
    return axios.post(`${process.env.REACT_APP_CartUrl}/addToCart`,{Order,Quantity,PurchasedBy})
}