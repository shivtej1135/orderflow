import express from "express";
import "./config/env.js";
import pool from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
       message: "OrderFlow API is running successfully"
    });
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

app.use(errorHandler);

export default app;
