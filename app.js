const express = require("express");
const path = require("path");
const responseTime = require("./middleware/responseTime");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(responseTime);

// Routes
app.use("/users", require("./routes/users"));
app.use("/blog", require("./routes/blog"));

// Contact form
app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact", (req, res) => {
  res.send("Form submitted successfully");
});

// Gallery
app.get("/gallery", (req, res) => {
  const images = ["img1.jpg", "img2.jpg"];
  res.render("gallery", { images });
});

// 404
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(3000, () => console.log("Server running on port 3000"));
