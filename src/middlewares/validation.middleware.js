const validateCreateProduct = (req, res, next) => {
    const { name, price } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({
            message: "Product name is required"
        });
    }

    if (price === undefined || price < 0) {
        return res.status(400).json({
            message: "Valid product price is required"
        });
    }

    next();
};

export { validateCreateProduct };