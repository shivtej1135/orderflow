import pool from "../config/db.js";


const findUserByEmail = async (email) => {
    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );

        return result.rows[0];;
    } catch (err) {
        throw err;
    }
};

const createUser = async ({ name, email, password, role }) => {
    try {
        const result = await pool.query(
            `INSERT INTO users (name, email, password, role)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [name, email, password, role]
        );

        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

const findUserById= async (id)=>{
    try{
        const result= await pool.query(
        `SELECT * FROM users WHERE id=$1`,
        [id]
    );
    return result.rows[0];
    }catch(err){
        throw err;
    }
};

export { findUserByEmail,createUser,findUserById };