import axios from "axios";
export const createChat=(senderId,chatRoomId,msgObj)=>{
    return axios.post(`${process.env.REACT_APP_ChatUrl}/createChat`,{senderId,chatRoomId,msgObj});
}