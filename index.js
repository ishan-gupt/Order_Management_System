// app.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/routes");
// Create Express app
const app = express();

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://ishan:ishan@cluster.pfpwlti.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB server", error);
  });

app.use(express.json());

// Middleware for parsing request body
app.use(bodyParser.json());
app.get("/greet", (req, res) => {
  res.send(`Hello, Ishan`);
});

app.use("/api/v1", apiRoutes);
app.post("/admin/signup", async (req, res) => {
  try {
    const { name, password, storeid } = req.body;
    const admin = new Admin({ name, password, storeid });
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ error: "Failed to signup admin" });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

//try

// Define mongoose models for admin, user, and order
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  storeid: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  storeid: { type: String, required: true },
  order_details: { type: String, required: true },
});

// Middleware for parsing request body
app.use(bodyParser.json());

// API endpoint for admin signup
app.post("/api/admin/signup", async (req, res) => {
  try {
    const { name, password, storeid } = req.body;
    const admin = new Admin({ name, password, storeid });
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ error: "Failed to signup admin" });
  }
});

// API endpoint for admin login
app.post("/api/admin/login", async (req, res) => {
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
});

// API endpoint for retrieving all orders for a store
app.get("/api/admin/orders/:storeid", async (req, res) => {
  try {
    const { storeid } = req.params;
    const orders = await Order.find({ storeid }).populate("customer");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
});
