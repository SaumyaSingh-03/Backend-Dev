// Set language
exports.setLanguage = (req, res) => {
    const { lang } = req.body;

    res.cookie("language", lang, {
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.send(`Language set to ${lang}`);
};

// Get language
exports.getLanguage = (req, res) => {
    const lang = req.cookies.language;

    if (!lang) {
        return res.send("No language set");
    }

    res.send(`Preferred language: ${lang}`);
};