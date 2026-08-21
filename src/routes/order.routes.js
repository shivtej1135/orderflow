import express from "express";

import {
    createOrderController,
    getOrdersController,
    getOrderByIdController
} from "../controllers/order.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.post("/", verifyToken, createOrderController);
router.get("/", verifyToken, getOrdersController);
router.get("/:id", verifyToken, getOrderByIdController);

export default router;