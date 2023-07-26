import axios from "axios"
export const getSpecificUser=(id)=>{
return axios.get(`${process.env.REACT_APP_UserUrl}/getUserDetails/${id}`)
}