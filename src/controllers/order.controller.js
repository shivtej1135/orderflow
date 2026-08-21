import { createOrderService,getOrdersByUserIdService,getOrderByIdService } from "../services/order.service.js";


const createOrderController = async (req, res, next) => {
    try {
        const order = await createOrderService(
            req.user.id,
            req.body.items
        );

        res.status(201).json(order);
    } catch (err) {
        next(err);
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