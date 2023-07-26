import axios from 'axios';
export const getAllChats=()=>{
    return axios.get(`${process.env.REACT_APP_ChatUrl}/getAllChat`);
}