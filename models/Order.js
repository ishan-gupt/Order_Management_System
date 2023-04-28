const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  storeid: { type: Number, required: true },
  order_details: { type: String, required: true },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = {
  Order,
};
