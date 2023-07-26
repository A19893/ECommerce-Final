const Chat = require("../models/chatModel");
// const objId=require("mongodb").ObjectId;

//Getting specific Chats
exports.getChat = async (req, res) => {
  try {
    const result = await Chat.findOne({ chatRoomId: req.params.id });
    return res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);
  }
};
//Getting all Chats
exports.getAllChat = async (req, res) => {
  try {
    const result = await Chat.find();
    return res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);
  }
};
//Creating a Chat
exports.createChat = async (req, res) => {
  console.log("--create Chat--", req.body);
  try {
    const result = await Chat.findOne({ chatRoomId: req.body.chatRoomId });
    console.log(result);
    if (result) {
      result.messages.push(req.body.msgObj);
      await result.save({ validateBeforeSave: false });
      return res.status(200).json({
        success: true,
        result,
      });
    } else {
      const result = await Chat.create({
        senderId: req.body.senderId,
        chatRoomId: req.body.chatRoomId,
        messages: [req.body.msgObj],
      });
      return res.status(201).json({
        success: true,
        result,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
