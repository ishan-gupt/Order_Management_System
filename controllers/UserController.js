const User = require("../models/User");
const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
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

