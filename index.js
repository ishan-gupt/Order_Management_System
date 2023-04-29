// app.js

const apiRouter=require("./routers/apiRoutes");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();
const {mongoConnect}= require("./controllers/mongocontroller")

// Create Express app
const app = express();

// Connect to MongoDB
mongoConnect();
// Define mongoose models for admin, user, and order
app.use(express.json());
app.use('/api', apiRouter);
// Middleware for parsing request body
app.use(bodyParser.json());
// API endpoint for admin signup

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
