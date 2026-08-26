import AppError from "../utils/errors.js";
import pool from "../config/db.js";
import { createOrder,updateOrderStatus,getOrderById } from "../models/order.model.js";
import { createOrderItem,getOrderItemsByOrderId } from "../models/orderItem.model.js";

import { findProductByIdTx} from "../models/product.model.js";
import { getInventoryByProductIdTx,updateInventoryTx } from "../models/inventory.model.js";

const createOrderService = async (userId,items) => {
    let client;
    
    try {
        // Get a dedicated database connection from the pool
        client = await pool.connect();
        // Start a database transaction
        await client.query("BEGIN");

        if (!items || items.length === 0) {
            throw new AppError("Order items are required",400);
        }

        let total = 0;

        for (const item of items) {

            if (item.quantity <= 0) {
                throw new AppError(
                    "Quantity must be greater than zero",
                    400
                );
            }

            const product =await findProductByIdTx(client,item.product_id);

            

            if (!product) {
                throw new AppError("Product not found",404);
            }
            const inventory =await getInventoryByProductIdTx(client,item.product_id);

            if (!inventory) {
                throw new AppError("Inventory not found",404);
            }

            if (item.quantity >inventory.quantity) {
                throw new AppError("Insufficient stock", 400);
            }
           
            

            total +=Number(product.price) * item.quantity;
        }
        const order = await createOrder(client,userId,total);

        for (const item of items) {
        const product = await findProductByIdTx(client,item.product_id);
        await createOrderItem(client,order.id,item.product_id,item.quantity,product.price);
        const inventory = await getInventoryByProductIdTx(client,item.product_id);
        const newQuantity =inventory.quantity - item.quantity;
        await updateInventoryTx(client,item.product_id,newQuantity);
        }
        // Permanently save all changes made in this transaction
        await client.query("COMMIT");
        return order;

    } catch (err) {

    if (client) {
        // If anything fails, undo all changes made in this transaction
    await client.query("ROLLBACK");
}
    throw err;

} finally {
    if (client) {
        client.release();
    }
}
};

const getOrdersByUserIdService = async (userId) => {
    try {
        const orders = await getOrdersByUserId(userId);

        return orders;
    } catch (err) {
        throw err;
    }
};

const getOrderByIdService = async (orderId) => {
    try {
        const order = await getOrderById(orderId);

        if (!order) {
            throw new AppError(
                "Order not found",
                404
            );
        }

        const items =
            await getOrderItemsByOrderId(
                orderId
            );

        return {
            ...order,
            items
        };
    } catch (err) {
        throw err;
    }
};

const updateOrderStatusService = async (orderId,status) => {
    try {
        const order = await updateOrderStatus(orderId,status);
        return order;
    } catch (err) {
        throw err;
    }
};

export {createOrderService,getOrdersByUserIdService,getOrderByIdService,updateOrderStatusService};