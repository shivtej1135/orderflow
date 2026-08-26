import pool from "../config/db.js";

const createOrder = async (client,userId,total,status = "pending") => {
    try {
        const result = await client.query(
            `INSERT INTO orders
            (user_id, status, total)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [userId, status, total]
        );

        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

const getOrdersByUserId = async (userId) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM orders
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [userId]
        );

        return result.rows;
    } catch (err) {
        throw err;
    }
};

const getOrderById = async (orderId) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM orders
             WHERE id = $1`,
            [orderId]
        );

        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

const updateOrderStatus = async (orderId,status) => {
    try {
        const result = await pool.query(
            `UPDATE orders
             SET status = $1,
                 updated_at = NOW()
             WHERE id = $2
             RETURNING *`,
            [status, orderId]
        );

        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

export {
    createOrder,
    getOrdersByUserId,
    getOrderById,
    updateOrderStatus
};