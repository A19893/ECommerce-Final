import axios from "axios";
export const getAllUsers=()=>{
return axios.get(`${process.env.REACT_APP_UserUrl}/getAllUsers`);
}