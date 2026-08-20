import pool from "../config/db.js";

const createProduct = async ({ name, description, price }) => {
    try {
        const result = await pool.query(
            `INSERT INTO products(name, description, price)
             VALUES($1, $2, $3)
             RETURNING *`,
            [name, description, price]
        );

        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

const findAllProducts = async () => {
    try {
        const result = await pool.query(
            `SELECT * FROM products
             ORDER BY id ASC`
        );

        return result.rows;
    } catch (err) {
        throw err;
    }
};

const findProductById = async (id) => {
    try {
        const result = await pool.query(
            `SELECT * FROM products
             WHERE id = $1`,
            [id]
        );

        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

const updateProduct = async (id, { name, description, price }) => {
    try {
        const result = await pool.query(
            `UPDATE products
             SET name = $1,
                 description = $2,
                 price = $3,
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $4
             RETURNING *`,
            [name, description, price, id]
        );

        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

const deleteProduct = async (id) => {
    try {
        const result = await pool.query(
            `DELETE FROM products
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

export {
    createProduct,
    findAllProducts,
    findProductById,
    updateProduct,
    deleteProduct
};