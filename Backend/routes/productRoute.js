const express=require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSpecificProduct, deleteSpecificProduct, getVendorProducts, getBestProducts,  } = require("../controllers/product.controller");
const router=express.Router();

//Route for getting all Products
router.route("/getProducts").get(getAllProducts);

//Route for creating a new Product
router.route("/createProduct").post(createProduct);

//Route for updating a specific product
router.route("/updateProduct/:id").put(updateProduct);

//Route for deleting a specific product
router.route("/deleteProduct/:id").post(deleteProduct);

//Route for getting a speific product
router.route("/specificProduct/:id").get(getSpecificProduct);

//Route for getting vendor products
router.route('/getVendorProducts/:id').get(getVendorProducts);

//Route for getting best products
router.route('/getBestProducts').get(getBestProducts)
module.exports=router;