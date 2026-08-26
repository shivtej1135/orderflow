import "./config/env.js";
import app from "./app.js";
import redisClient from "./config/redis.js";
import pool from "./config/db.js";
import http from "http";
import { initializeSocket } from "./socket.js";
import { publisher, subscriber } from "./config/redisPubSub.js";
import subscribeToOrderStatusUpdates from "./subscribers/orderStatus.subscriber.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await pool.query("SELECT 1");

    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    // Connect Redis Pub/Sub clients
    if (!publisher.isOpen) {
        await publisher.connect();
    }

    if (!subscriber.isOpen) {
        await subscriber.connect();
    }

    const server = http.createServer(app);

    // Initialize Socket.IO server
    initializeSocket(server);
    // Start listening for order status updates from Redis
    await subscribeToOrderStatusUpdates();

    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();