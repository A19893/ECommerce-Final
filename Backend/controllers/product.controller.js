const Product = require("../models/productModel");
//Create Product
exports.createProduct = async (req, res) => {
  console.log("data", req.body);
  try {
    const product = await Product.create(req.body);
    console.log(product);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
  }
};
//Get All Product
exports.getAllProducts = async (req, res, next) => {
  try {
    const result = await Product.find({});
    res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);
  }
};
//Update a Specific Product
exports.updateProduct = async (req, res, next) => {
  // console.log('----id---',req.params.id,'----body',req.body);
  try {
    let result = await Product.findById(req.params.id);
    if (!result) {
      return res.status(500).json({
        success: false,
        message: "Product Not Found",
      });
    }
    result = await Product.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);
  }
};
//Delete a Specific Product
exports.deleteProduct = async (req, res) => {
  try {
    let result = await Product.findById(req.params.id);
    if (!result) {
      return res.status(203).json({
        success: false,
        message: "Product Not Found",
      });
    }
    result = await Product.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
      message: "Deleted",
    });
  } catch (err) {
    console.log(err);
  }
};
//Get a Specific Product
exports.getSpecificProduct = async (req, res, next) => {
  try {
    let result = await Product.findById(req.params.id);
    if (!result) {
      return res.status(500).json({
        success: false,
        message: "Product Not Found",
      });
    }
    res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);
  }
};
//get Vendor products
exports.getVendorProducts = async (req, res) => {
  try {
    let result = await Product.find({ CreatedBy: req.params.id });
    if (result) {
      return res.status(200).json({
        success: true,
        result,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
//get Best Products
exports.getBestProducts = async (req, res) => {
  try {
    let result = await Product.find().sort({ PurchaseCount: -1 }).limit(4);
    if (result) {
      return res.status(200).json({
        success: true,
        result,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
