const express = require("express");
const router = express.Router();

const {
    setLanguage,
    getLanguage
} = require("../controllers/cookieController");

router.post("/set-language", setLanguage);
router.get("/get-language", getLanguage);

module.exports = router;