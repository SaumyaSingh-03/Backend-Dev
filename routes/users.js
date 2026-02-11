const express = require("express");
const router = express.Router();

const users = ["Aman", "Riya", "Saumya", "Rahul"];

router.get("/", (req, res) => {
  const { name } = req.query;
  const filtered = name
    ? users.filter(u => u.toLowerCase().includes(name.toLowerCase()))
    : users;

  res.json(filtered);
});

module.exports = router;
