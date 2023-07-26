import axios from "axios";
export const updateUser=(id,name,address,password,email,avatar,companyLogo,companyName,companyDetails)=>{
 return axios.put(`${process.env.REACT_APP_UserUrl}/updateUserDetails/${id}`,{name,address,password,email,avatar,companyLogo,companyName,companyDetails});
}