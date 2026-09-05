
import redisClient from "../config/redis.js";

const saveIdempotencyResult = async (key,requestHash, result) => {
    try{
    await redisClient.set(
        `idempotency:${key}`,
        JSON.stringify({requestHash,response: result}),
        {
            EX: 60 * 60 * 24
        }
    );
}catch (err) {
        throw err;
    }
};



export { saveIdempotencyResult };