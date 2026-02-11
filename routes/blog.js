const express = require("express");
const router = express.Router();

let posts = [];

router.get("/", (req, res) => {
  res.render("blog/list", { posts });
});

router.get("/new", (req, res) => {
  res.render("blog/create");
});

router.post("/new", (req, res) => {
  posts.push(req.body);
  res.redirect("/blog");
});

router.get("/:id", (req, res) => {
  res.render("blog/view", { post: posts[req.params.id] });
});

module.exports = router;
