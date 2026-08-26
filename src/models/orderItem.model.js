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

const getOrderItemsByOrderId = async (orderId) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM order_items
             WHERE order_id = $1`,
            [orderId]
        );

        return result.rows;
    } catch (err) {
        throw err;
    }
};

export{createOrderItem,getOrderItemsByOrderId};