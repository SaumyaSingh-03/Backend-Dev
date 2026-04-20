// Add item to cart
exports.addToCart = (req, res) => {
    const { item } = req.body;

    // If user logged in → use session
    if (req.session.user) {
        if (!req.session.cart) {
            req.session.cart = [];
        }

        req.session.cart.push(item);
        return res.send("Item added to session cart 🛒");
    }

    // Guest → use cookies
    let cart = [];

    if (req.cookies.cart) {
        cart = JSON.parse(req.cookies.cart);
    }

    cart.push(item);

    res.cookie("cart", JSON.stringify(cart), {
        maxAge: 24 * 60 * 60 * 1000
    });

    res.send("Item added to cookie cart 🍪");
};


// View cart
exports.viewCart = (req, res) => {
    if (req.session.user) {
        return res.json({
            type: "session",
            cart: req.session.cart || []
        });
    }

    let cart = [];

    if (req.cookies.cart) {
        cart = JSON.parse(req.cookies.cart);
    }

    res.json({
        type: "cookie",
        cart
    });
};