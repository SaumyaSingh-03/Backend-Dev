// Fake login (no DB for now)
exports.login = (req, res) => {
    const { username, password } = req.body;

    // simple check
    if (username === "admin" && password === "1234") {
        req.session.user = {
            username: "admin",
            role: "admin"
        };

        return res.send("Admin logged in");
    }

    if (username === "user" && password === "1234") {
        req.session.user = {
            username: "user",
            role: "user"
        };

        return res.send("User logged in");
    }

    res.send("Invalid credentials");
};

// Protected route
exports.dashboard = (req, res) => {
    res.send("Welcome to Admin Dashboard 🔥");
};

// Logout
exports.logout = (req, res) => {
    req.session.destroy();
    res.send("Logged out successfully");
};