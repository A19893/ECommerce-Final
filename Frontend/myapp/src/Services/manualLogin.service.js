import axios from 'axios'
export const manualLogin=(password,email)=>{
    // console.log(process.env.REACT_APP_UserUrl)
    return axios.post(`${process.env.REACT_APP_UserUrl}/loginUser`,{email,password})
}