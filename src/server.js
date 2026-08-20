import "./config/env.js";
import app from "./app.js";
import redisClient from "./config/redis.js";
import pool from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await pool.query("SELECT 1");
    await redisClient.connect();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();