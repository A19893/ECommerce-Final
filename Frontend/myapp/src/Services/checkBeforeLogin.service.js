import axios from 'axios'
export const checkUser=(email,password)=>{
    // console.log("aaya");
    return axios.post(`${process.env.REACT_APP_UserUrl}/loginUser`,{email,password})
}