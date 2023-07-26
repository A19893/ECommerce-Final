import axios from "axios";
export const updatePurchaseCount=(id,PurchaseCount)=>{
    console.log('----Count---',PurchaseCount);
    return axios.put(`${process.env.REACT_APP_ProductUrl}/updateProduct/${id}`,{PurchaseCount});
}