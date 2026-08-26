import metrics from "../utils/metrics.js";

// Return current application metrics
const metricsController = (
    req,
    res
) => {

    const averageRequestDuration =
        metrics.requestCount > 0
            ? metrics.totalRequestDuration /
              metrics.requestCount
            : 0;

    res.status(200).json({
        ...metrics,
        averageRequestDuration
    });
};

export default metricsController;