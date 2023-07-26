import axios from "axios";
export const updateStatus=(id,status)=>{
    console.log('---id--',id,'---status--',status);
    return axios.put(`${process.env.REACT_APP_UserUrl}/updateUserDetails/${id}`,{status});
    }