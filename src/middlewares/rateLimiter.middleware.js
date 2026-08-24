import redisClient from "../config/redis.js";

const rateLimiter = (keyPrefix, limit, windowSeconds) => {
    return async (req, res, next) => {
        try {

            // Create Redis key using client IP
            const key = `${keyPrefix}:${req.ip}`;

            // Atomically increment request count
            const count = await redisClient.incr(key);

            // First request in the window
            if (count === 1) {
                await redisClient.expire(key, windowSeconds);
            }

            // Request limit exceeded
            if (count > limit) {

                // Tell client when to retry
                res.set("Retry-After",windowSeconds);

                return res.status(429).json({message:"Too many requests. Try again later."});
            }

            next();

        } catch (err) {
            next(err);
        }
    };
};

export default rateLimiter;