import pool from "../config/db.js";
import redisClient from "../config/redis.js";

// Check health of API dependencies
const healthCheckController = async (
    req,
    res
) => {

    const health = {
        api: "healthy",
        postgres: "healthy",
        redis: "healthy"
    };

    try {

        // Verify PostgreSQL connection
        await pool.query("SELECT 1");

    } catch (err) {

        health.postgres = "unhealthy";
    }

    try {

        // Verify Redis connection
        await redisClient.ping();

    } catch (err) {

        health.redis = "unhealthy";
    }

    const isHealthy =
        health.postgres === "healthy" &&
        health.redis === "healthy";

    if (!isHealthy) {

        return res.status(503).json({
            status: "unhealthy",
            health
        });
    }

    return res.status(200).json({
        status: "healthy",
        health
    });
};

export default healthCheckController;