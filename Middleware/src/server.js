const app = require("./app");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:admin123@cluster0.9wm7gek.mongodb.net/middlewareDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});