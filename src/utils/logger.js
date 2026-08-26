import pino from "pino";

// Application logger used throughout the project
const logger = pino({
    level: "info"
});

export default logger;