import { createOrderService,getOrdersByUserIdService,getOrderByIdService } from "../services/order.service.js";
import { saveIdempotencyResult } from "../services/idempotency.service.js";
import redisClient from "../config/redis.js";


const createOrderController = async (req, res, next) => {
    try {
        const order = await createOrderService(req.user.id, req.body.items);

        // Store successful result in Redis
        await saveIdempotencyResult(req.idempotencyKey,req.requestHash,order); // if there is any error in createOrderService then directly catch with work

        res.status(201).json(order);
        
    } catch (err) {
        next(err);
    }finally {

        // Release the temporary processing lock
        if (req.idempotencyKey) {await redisClient.del(`claim:${req.idempotencyKey}`);
        }
    }
};

const getOrdersController = async (req, res, next) => {
    try {
        const orders = await getOrdersByUserIdService(
            req.user.id
        );

        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
};

const getOrderByIdController = async (req, res, next) => {
    try {
        const order = await getOrderByIdService(
            req.params.id,
            req.user
        );

        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
};

export {
    createOrderController,
    getOrdersController,
    getOrderByIdController
};