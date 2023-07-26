import axios from "axios"
export const removeCart=(id)=>{
    return axios.post(`${process.env.REACT_APP_CartUrl}/removeItem/${id}`)
}