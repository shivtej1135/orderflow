import pool from "../config/db.js";

const getInventoryByProductId = async (productId) => {
    try {
        const result = await pool.query(
            `SELECT * FROM inventory
             WHERE product_id = $1`,
            [productId]
        );

        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

const updateInventory = async (productId, quantity) => {
    try {
        const result = await pool.query(
            `UPDATE inventory
             SET quantity = $1,
                 updated_at = CURRENT_TIMESTAMP
             WHERE product_id = $2
             RETURNING *`,
            [quantity, productId]
        );

        return result.rows[0];
    } catch (err) {
        throw err;
    }
};


export { getInventoryByProductId,updateInventory };