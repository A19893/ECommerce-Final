const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxLength: [8, "Price cannot exceed 8 figures"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  image: [],
  category: {
    type: String,
    required: [true, "Please choose a Category!"],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter Product Stock"],
    default: 1,
  },
  ReviewsCount: {
    type: Number,
    default: 0,
  },
  PurchaseCount:{
    type:Number,
    default:0,
  },
  Reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
    },
  ],
  CreatedBy: {
    type: String,
    default: "yasharora2678@gmail.com",
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
  Status:{
    type:String,
    required:true
  }
});
module.exports = mongoose.model("Prodcut", productSchema);
