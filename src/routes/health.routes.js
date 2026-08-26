import express from "express";
import healthCheckController from "../controllers/health.controller.js";

const router = express.Router();

// System health check endpoint
router.get(
    "/",
    healthCheckController
);

export default router;