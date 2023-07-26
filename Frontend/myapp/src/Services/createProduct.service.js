import axios from "axios";
export const addProducts=(name,description,price,category,image,CreatedBy,Stock,Status)=>{
   return axios.post(`${process.env.REACT_APP_ProductUrl}/createProduct`,{name,description,price,category,image,CreatedBy,Stock,Status});
}