import AppError from "../utils/errors.js";
import redisClient from "../config/redis.js";
import crypto from "crypto";
const idempotencyMiddleware = async (req, res, next) => {

    // Read the Idempotency-Key header sent by the client
    const key = req.header("Idempotency-Key");

    // If the header is missing, reject the request
    if (!key) {
        throw new AppError("Idempotency-Key header is required",400);
    }

    const requestHash = crypto // Generate a hash of the request body
    .createHash("sha256")                           // Used to detect if the same key is reused with different data
    .update(JSON.stringify(req.body))
    .digest("hex");
    req.requestHash = requestHash;

    
     // Check if this idempotency key already exists in Redis
    const cachedResponse = await redisClient.get(`idempotency:${key}`);

     // If key already exists,
    // return stored response instead of creating another order
    if (cachedResponse) {

    const cachedData = JSON.parse(cachedResponse);
         // Same key but different request body
    if (cachedData.requestHash !== requestHash) {
        throw new AppError("Same Idempotency-Key used with different request body",409);
    }
    // Same key and same request body
    // Return cached response instead of creating a new order
    return res.status(200).json(cachedData.response);
        }
        
    // Atomically claim this idempotency key.
    // Only one concurrent request can succeed.
    const claimResult = await redisClient.set(`claim:${key}`,"processing",
        {
            NX: true,
            EX: 60
        }
    );
    if (!claimResult) {
    throw new AppError("Request already being processed",409);
        }

console.log(claimResult);
        // Make key available to downstream controller/service
    req.idempotencyKey = key;

    // Header exists, so continue to the next middleware/controller
    next();
};

export {idempotencyMiddleware};