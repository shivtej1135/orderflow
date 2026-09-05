import redisClient from "../config/redis.js";

// Get data from Redis
const getCached = async (key) => {
    const data = await redisClient.get(key);

    if (!data) {
        return null;
    }

    return JSON.parse(data);
};

// Save data to Redis
const setCached = async (key, value, ttl = 300) => {
    await redisClient.set(key,JSON.stringify(value),
        {
            EX: ttl
        }
    );
};

// Delete cache key
const invalidate = async (key) => {
    console.log("BEFORE INVALIDATE");
    await redisClient.del(key);
    console.log("AFTER INVALIDATE");
};

export {getCached,setCached,invalidate};