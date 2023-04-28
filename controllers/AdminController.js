const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

exports.adminSignup = async (req, res) => {
  try {
    const { name, password, storeId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      name: name,
      password: hashedPassword,
      storeId: storeId,
    });
    await admin.save();
    res.json({ message: "Admin signup successful " });
  } catch (errors) {
    res.status(500).json({ error: "Failed to signup admin" });
  }
};

exports.adminLogin = async (req, res) => {
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

exports.getAllOrders = async (req, res) => {
  try {
    const { storeid } = req.params;
    const orders = await Order.find({ storeid }).populate("customer");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};
