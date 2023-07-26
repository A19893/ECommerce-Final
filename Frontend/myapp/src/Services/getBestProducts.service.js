import axios from "axios";
export const getBestProducts=()=>{
    // console.log(`${process.env.REACT_APP_ProductUrl}/getBestProducts`)
    return axios.get(`${process.env.REACT_APP_ProductUrl}/getBestProducts`);
}