import pool from "../config/db.js";

const createRefreshToken = async(userId,tokenHash,expiresAt)=>{
    try{
        const result = await pool.query(
        `INSERT INTO refresh_tokens (user_id,token_hash,expires_at)
        VALUES($1,$2,$3)
        RETURNING*`,
        [userId,tokenHash,expiresAt]
         );

        return result.rows[0];
    }catch (err) {
        throw err;
    }
};

const findRefreshToken = async(tokenHash)=>{
    try{
        const result = await pool.query(
            `SELECT * FROM refresh_tokens WHERE token_hash=$1`,
            [tokenHash]
        );
        return result.rows[0];;
    }catch (err) {
        throw err;
    }
}

const deleteRefreshToken = async(tokenHash)=>{
    try{
         const result = await pool.query(
            `DELETE FROM refresh_tokens
            WHERE token_hash = $1
            RETURNING *`,
            [tokenHash]
         );
         return result.rows[0];
    }catch (err) {
        throw err;
    }
}

export { createRefreshToken,findRefreshToken ,deleteRefreshToken};