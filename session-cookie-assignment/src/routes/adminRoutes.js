const express = require("express");
const router = express.Router();

const {
    login,
    dashboard,
    logout
} = require("../controllers/adminController");

const { isAdmin } = require("../middleware/adminMiddleware");

// login
router.post("/login", login);

// protected
router.get("/dashboard", isAdmin, dashboard);

// logout
router.get("/logout", logout);

module.exports = router;