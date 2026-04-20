const express = require("express");
const logger = require("./middleware/logger");
const verifyJWT = require("./middleware/auth");
const verifyOTP = require("./middleware/otp");
const rateLimiter = require("./middleware/rateLimiter");
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(logger);
app.use(rateLimiter);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/secure", verifyJWT, verifyOTP, (req, res) => {
  res.send("Access granted");
});

module.exports = app;