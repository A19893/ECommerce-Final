import axios from "axios"
export const manualSignup=(name,password,email,number)=>{
    return axios.post(`${process.env.REACT_APP_UserUrl}/registerUser`,{name:name,password:password,email:email,number:number})
}