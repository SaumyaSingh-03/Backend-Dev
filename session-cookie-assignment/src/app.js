const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cookieRoutes = require("./routes/cookieRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/cookies", cookieRoutes);
app.use("/admin", adminRoutes);
app.use("/cart", cartRoutes);
// session setup
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 60000 // 1 minute (for testing)
    }
}));
app.use((req, res, next) => {
    req.session.lastActivity = Date.now();
    next();
});

// routes
const sessionRoutes = require("./routes/sessionRoutes");
app.use("/session", sessionRoutes);

module.exports = app;
