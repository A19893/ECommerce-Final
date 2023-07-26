import axios from 'axios';
export const  removeSpecificOrder=(id)=>{
    return axios.get(`${process.env.REACT_APP_OrderUrl}/deleteOrder/${id}`)
}