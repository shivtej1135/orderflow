import express from "express";

const router = express.Router();

import { verifyToken } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/rbac.middleware.js";

import {
    getInventoryByProductIdController,
    updateInventoryController
} from "../controllers/inventory.controller.js";

router.get("/:id/inventory", verifyToken, authorize("admin", "customer"), getInventoryByProductIdController);
router.patch("/:id/inventory", verifyToken, authorize("admin"), updateInventoryController);

export default router;