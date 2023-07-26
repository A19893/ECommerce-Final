import axios from "axios"
export const updateRole=(role,id)=>{
return axios.post(`${process.env.REACT_APP_UserUrl}/selectRole`,{role,id})
}