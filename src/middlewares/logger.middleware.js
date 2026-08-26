import logger from "../utils/logger.js";
import metrics from "../utils/metrics.js";
// Log request start and completion with duration
const loggerMiddleware = (
    req,
    res,
    next
) => {

    const startTime = Date.now();

    // Log incoming request
    logger.info({
        requestId: req.requestId,
        method: req.method,
        route: req.originalUrl,
        message: "Request started"
    });

  res.on("finish", () => {

    const duration =
        Date.now() - startTime;

    metrics.requestCount++;

    metrics.totalRequestDuration += duration;

    if (res.statusCode >= 500) {
        metrics.errorCount++;
    }

    // Log completed request
    logger.info({
        requestId: req.requestId,
        method: req.method,
        route: req.originalUrl,
        status: res.statusCode,
        duration,
        message: "Request completed"
    });
});

    next();
};

export default loggerMiddleware;