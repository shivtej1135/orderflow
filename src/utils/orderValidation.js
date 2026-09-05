import AppError from "./errors.js";

// Validate order items before processing
const validateOrderItems = (items) => {

    // Order must contain at least one item
    if (!items || items.length === 0) {
        throw new AppError(
            "Order items are required",
            400
        );
    }

    for (const item of items) {

        // Quantity cannot be zero or negative
        if (item.quantity <= 0) {
            throw new AppError(
                "Quantity must be greater than zero",
                400
            );
        }
    }
};

export default validateOrderItems;