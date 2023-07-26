import axios from "axios";
export const updateProduct=(id,name,description,price,category,image,Stock,Status)=>{
    return axios.put(`${process.env.REACT_APP_ProductUrl}/updateProduct/${id}`,{name,description,price,category,image,Stock,Status});
}