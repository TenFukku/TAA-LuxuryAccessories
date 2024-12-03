const User = require("../models/users.model");
const Product = require("../models/products.model");
const cloudinary = require("../utils/cloudinary");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Admin = require("../models/admin.model");

const get = async (req, res) => {
  try {
    const admin = await Admin.find({});
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAdmin = async (req, res) => {
  console.log(req.body);
  try {
    const { username , password} = req.body;
    const admin = await Admin.findOne({ admin_username: username });
    if (!admin) {
      return res.status(404).json({ message: "Không tìm thấy Admin" });
    }
    if(password !== admin.admin_password){
      return res.status(400).json({ message: "Sai mật khẩu"  });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const admin = {
  get,
  getAdmin,
};

module.exports = admin;
