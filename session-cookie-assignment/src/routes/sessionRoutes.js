const express = require("express");
const router = express.Router();

const {
    step1,
    step2,
    final
} = require("../controllers/sessionController");

router.post("/step1", step1);
router.post("/step2", step2);
router.get("/final", final);
router.get("/check-timeout", (req, res) => {
    if (!req.session.lastActivity) {
        return res.send("No active session");
    }

    const currentTime = Date.now();
    const diff = currentTime - req.session.lastActivity;

    // if more than 50 sec passed (warning zone)
    if (diff > 50000) {
        return res.send("⚠️ Session about to expire!");
    }

    res.send("Session active");
});
module.exports = router;