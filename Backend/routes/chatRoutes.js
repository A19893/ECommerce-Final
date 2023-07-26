const express=require('express');
const { getChat, createChat, getAllChat } = require('../controllers/chat.controller');

const router=express.Router();

//Route for getting specific chats
router.route("/getChat/:id").get(getChat);

//Route for creating a chats
router.route("/createChat").post(createChat);

//Route for gettng all chats
router.route("/getAllChat").get(getAllChat);
module.exports=router;