const mongoose = require('mongoose');
const adminSchema= require("../models/admin");

const Admin = mongoose.model("Admin", adminSchema);


const adminSignup= async (req, res) => {
    try {
      const { name, password, storeid } = req.body;
      const admin = new Admin({ name, password, storeid });
      await admin.save();
      res.status(201).json(admin);
    } catch (error) {
      res.status(500).json({ error: "Failed to signup admin" });
    }
  }
  const adminLogin = async (req, res) => {
    try {
      const { name, password } = req.body;
      const admin = await Admin.findOne({ name, password });
      if (admin) {
        res.status(200).json(admin);
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to login admin" });
    }
  };
  
  module.exports={
    adminSignup:adminSignup,
    adminLogin:adminLogin,

  }