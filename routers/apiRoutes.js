const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  placeOrder,
  userCheck,
  userSignup,
} = require("../controllers/orderController");
const { adminSignup, adminLogin } = require("../controllers/adminController");

router.post("/orders/", placeOrder);
router.get("/orders/:storeid", getAllOrders);

router.post("/admin/signup", adminSignup);
router.post("/admin/login", adminLogin);
router.get("/greet", (req, res) => {
  res.send(`Hello, Ishan`);
});
module.exports = router;
