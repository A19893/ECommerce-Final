const express=require("express");
const { registerUser, loginUser, getUserDetails, updateUserDetails, getAllUsers, getAllVendors, deleteUser, selectRole } = require("../controllers/user.controller");
const router=express.Router();

//Route for adding up user in database
router.route("/registerUser").post(registerUser);

//Route for login user for database
router.route("/loginUser").post(loginUser);
module.exports=router;

//Route for getting specific user details from database
router.route("/getUserDetails/:id").get(getUserDetails);

//Route for updating specific user details from database
router.route("/updateUserDetails/:id").put(updateUserDetails);

//Route for getting all users from database
router.route("/getAllUsers").get(getAllUsers);

//Route for getting all vendors from database
router.route("/getAllVendors").get(getAllVendors);

//Route for deleting a specific user
router.route("/deleteUser/:id").get(deleteUser);

//Route for Selecting a Role of User
router.route("/selectRole").post(selectRole);