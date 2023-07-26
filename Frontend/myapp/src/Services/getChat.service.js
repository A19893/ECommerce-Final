import axios from 'axios'
export const getChat=(id)=>{
    return axios.get(`${process.env.REACT_APP_ChatUrl}/getChat/${id}`);
}