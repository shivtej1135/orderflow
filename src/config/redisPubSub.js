import { createClient } from "redis";

// Redis client used for publishing events
const publisher = createClient({
    url: process.env.REDIS_URL
});

// Redis client used for subscribing to events
const subscriber = createClient({
    url: process.env.REDIS_URL
});

export {
    publisher,
    subscriber
};