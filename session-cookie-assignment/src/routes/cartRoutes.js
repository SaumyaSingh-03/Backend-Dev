const express = require("express");
const router = express.Router();

const {
    addToCart,
    viewCart
} = require("../controllers/cartController");

router.post("/add", addToCart);
router.get("/view", viewCart);

module.exports = router;