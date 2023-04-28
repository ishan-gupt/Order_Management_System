const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const UserController = require("../controllers/UserController");

router.post("/admin/signup", AdminController.adminSignup);
router.post("/admin/login", AdminController.adminLogin);
router.get("/admin/orders/:storeid", AdminController.getAllOrders);

router.post("/user/order", UserController.placeOrder);

router.get("/greet", (req, res) => {
  res.send(`Hello, Ishan`);
});
module.exports = router;
