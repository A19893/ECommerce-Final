const mongoose = require("mongoose");
const cartSchema=new mongoose.Schema({
    Order:{
        type:Object,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    PurchasedBy:{
        type:mongoose.Schema.ObjectId,
        Ref:"User",
        required:true
    }
});
module.exports = mongoose.model("Cart",cartSchema);