const User = require("../models/userModel");
const objId = require("mongodb").ObjectId;
//Register a User
exports.registerUser = async (req, res) => {
  console.log("Req", req.body);
  await User.findOne({
    $or: [{ email: req.body.email }, { number: req.body.number ?? "#" }],
  })
    .then(async (result) => {
      console.log("result mila", result);
      if (result) {
        if (result.email === req.body.email) {
          return res.status(203).json({
            success: false,
            message: "Email already exists",
            result,
          });
        } else {
          return res.status(202).json({
            success: false,
            message: "Phone number already exists",
            result,
          });
        }
      } else {
        const creation = await User.create(req.body);
        return res.status(201).json({
          success: true,
          creation,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
//Check User Exists
exports.loginUser = async (req, res) => {
  console.log(req.body);
  await User.findOne({
    $or: [{ email: req.body.email }, { number: req.body.email }],
  })
    .then((result) => {
      console.log(result);
      if (result == null) {
        return res.status(200).json({
          success: false,
          message: "User not Found",
        });
      } else {
        if (result.password === req.body.password) {
          return res.status(201).json({
            success: true,
            message: "User Found",
            result,
          });
        } else {
          return res.status(203).json({
            success: true,
            message: "Username or Password Incorrect",
          });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
//Get All User Details
exports.getAllUsers = async (req, res, next) => {
  try {
    const result = await User.find({ role: "User" });
    return res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);
  }
};
//Get User Details
exports.getUserDetails = async (req, res, next) => {
  await User.findOne({ _id: req.params.id })
    .then((result) => {
      if (result) {
        return res.status(200).json({
          success: true,
          result,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "User Not Found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
//update User Details
exports.updateUserDetails = async (req, res, next) => {
  // console.log(req.params.id,'----body--',req.body);
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);
  }
};
//Get All Vendors
exports.getAllVendors = async (req, res, next) => {
  try {
    const result = await User.find({ role: "Vendor" });
    return res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);
  }
};
//Delete a Specific User
exports.deleteUser = async (req, res, next) => {
  try {
    const result = await User.findByIdAndRemove(req.params.id);
    if (!result) {
      return res.status(500).json({
        success: false,
        message: "User Not Found",
      });
    }
    console.log(result);
    res.status(200).json({
      success: true,
      message: "Deleted",
    });
  } catch (err) {
    console.log(err);
  }
};
//Selecting a Role for User
exports.selectRole = async (req, res) => {
  console.log(req.body);
  User.updateOne(
    { _id: new objId(req.body.id) },
    { $set: { role: req.body.role } }
  )
    .then((result) => {
      console.log(result);
      User.findOne({ _id: req.body.id }).then((result) => {
        console.log(result);
        return res.status(201).json({
          success: true,
          result,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
