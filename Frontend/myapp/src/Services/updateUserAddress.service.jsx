import axios from "axios";
export const updateAddress=(id,address,country,state)=>{
    console.log(state,country)
    return axios.put(`${process.env.REACT_APP_UserUrl}/updateUserDetails/${id}`,{address,state,country});
}