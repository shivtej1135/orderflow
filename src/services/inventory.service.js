import { getInventoryByProductId,updateInventory } from "../models/inventory.model.js";
import { findProductById } from "../models/product.model.js";
import AppError from "../utils/errors.js";

const getInventoryByProductIdService = async (productId) => {
    try {
        const product = await findProductById(productId);

        if (!product) {
            throw new AppError("Product not found", 404);
        }

        const inventory = await getInventoryByProductId(productId);

        if (!inventory) {
            throw new AppError("Inventory not found", 404);
        }

        return inventory;
    } catch (err) {
        throw err;
    }
};

const updateInventoryService = async (
    productId,
    quantity
) => {
    try {
        const product = await findProductById(productId);

        if (!product) {
            throw new AppError("Product not found",404 );
        }

        if (quantity < 0) {
            throw new AppError("Quantity cannot be negative",400);
        }

        const inventory = await getInventoryByProductId(productId);
           
       

        if (!inventory) {
            throw new AppError("Inventory not found",404);
        }
       
        const updatedInventory =await updateInventory(productId,quantity);     

        return updatedInventory;
    } catch (err) {
        throw err;
    }
};

export {
    getInventoryByProductIdService,
    updateInventoryService
};