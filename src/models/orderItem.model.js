import pool from "../config/db.js";

const createOrderItem = async (client,orderId,productId,quantity,unitPrice) => {
    try {
        const result = await client.query(
            `INSERT INTO order_items
            (order_id, product_id, quantity, unit_price)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [orderId,productId,quantity,unitPrice]
        );
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

export{createOrderItem};