import express from "express";

const router = express.Router();

import { verifyToken } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/rbac.middleware.js";
import { validateCreateProduct } from "../middlewares/validation.middleware.js";

import {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController
} from "../controllers/product.controller.js";


router.get("/", verifyToken, authorize("admin", "customer"), getAllProductsController);
router.get("/:id", verifyToken, authorize("admin", "customer"), getProductByIdController);
router.put("/:id", verifyToken, authorize("admin"), updateProductController);
router.delete("/:id", verifyToken, authorize("admin"), deleteProductController);
router.post("/", verifyToken, authorize("admin"), validateCreateProduct, createProductController);

export default router;