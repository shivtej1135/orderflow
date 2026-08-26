import express from "express";
import metricsController from "../controllers/metrics.controller.js";

const router = express.Router();

// Expose application metrics
router.get(
    "/",
    metricsController
);

export default router;