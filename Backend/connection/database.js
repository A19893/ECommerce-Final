const mongoose=require("mongoose");
require('dotenv').config();
const connectDatabase=()=>{
    mongoose.connect(process.env.URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then((database)=>{
    console.log(`Connected`);
}).catch((err)=>{
    console.log(err);
})
}
module.exports=connectDatabase