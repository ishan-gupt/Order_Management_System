const mongoose = require('mongoose');
const orderSchema = require("../models/order");
const userSchema=require("../models/user");
const User = mongoose.model("User", userSchema);
const Order = mongoose.model("Order", orderSchema);

const getAllOrders = async (req, res) => {
    try {
      const { storeid } = req.params;
      const orders = await Order.find({ storeid }).populate("customer");
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve orders" });
    }
  };
const placeOrder = async (req, res) => {
    try {
      const { name, address, contact, storeid, order_details } = req.body;
  
      // Find or create user based on name and contact
      let user = await User.findOne({ name, contact });
      if (!user) {
        user = new User({ name, address, contact });
        await user.save();
      }
  
      // Create order
      const order = new Order({ customer: user._id, storeid, order_details });
      await order.save();
  
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to place order" });
    }
  };
  module.exports={
    getAllOrders:getAllOrders,
    placeOrder:placeOrder,

  }