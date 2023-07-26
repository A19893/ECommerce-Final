const mongoose=require('mongoose');
const chatSchema=new mongoose.Schema({
  senderId:{
    type:String,
    required:true
  },
    chatRoomId:{
        type:String,
        required:true,
    },
    messages:[
      {
        message:{
            type:String,
            required:true,
        },
        senderId:{
            type:String,
            required:true,
        }
      }
    ]
})
module.exports=mongoose.model("Chats",chatSchema);