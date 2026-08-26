import { randomUUID } from "crypto";

// Generate a unique request id for every incoming request
const requestIdMiddleware = (
    req,
    res,
    next
) => {

    // Attach request id to request object
    req.requestId = randomUUID();

    next();
};

export default requestIdMiddleware;