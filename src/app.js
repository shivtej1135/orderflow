import express from "express";
import "./config/env.js";
import pool from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
       message: "OrderFlow API is running successfully"
    });
});

app.use("/auth", authRoutes);



export default app;
