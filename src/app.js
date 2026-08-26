import express from "express";
import "./config/env.js";
import pool from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import orderRoutes from "./routes/order.routes.js";
import requestIdMiddleware from "./middlewares/requestId.middleware.js";
import loggerMiddleware from "./middlewares/logger.middleware.js";
import healthRoutes from "./routes/health.routes.js";
import metricsRoutes from "./routes/metrics.routes.js";
const app = express();
app.use(express.json());

// Generate a unique request id for every request
app.use(requestIdMiddleware)

// Log every incoming request and response
app.use(loggerMiddleware);

app.get("/", (req, res) => {
    res.json({
       message: "OrderFlow API is running successfully"
    });
});


app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/products", inventoryRoutes);
app.use("/orders", orderRoutes);
// Health check endpoint for deployment monitoring
app.use("/health", healthRoutes);
// Application metrics endpoint
app.use("/metrics", metricsRoutes);
app.use(errorHandler);


export default app;
