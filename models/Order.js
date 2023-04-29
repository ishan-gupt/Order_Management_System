

const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    storeid: { type: String, required: true },
    order_details: { type: String, required: true },
  });


  module.exports=orderSchema;