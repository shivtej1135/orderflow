import redisClient from "../src/config/redis.js";

beforeAll(async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
    await redisClient.flushDb();
});

afterAll(async () => {
    if (redisClient.isOpen) {
        await redisClient.quit();
    }
});