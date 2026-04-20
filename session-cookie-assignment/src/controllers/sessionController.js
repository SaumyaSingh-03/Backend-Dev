// Step 1: Save name
exports.step1 = (req, res) => {
    req.session.user = {
        name: req.body.name
    };
    res.send("Step 1 completed (name saved)");
};

// Step 2: Save email
exports.step2 = (req, res) => {
    if (!req.session.user) {
        return res.send("Complete step 1 first");
    }

    req.session.user.email = req.body.email;
    res.send("Step 2 completed (email saved)");
};

// Final step: Show data
exports.final = (req, res) => {
    if (!req.session.user) {
        return res.send("No session data found");
    }

    res.json(req.session.user);
};