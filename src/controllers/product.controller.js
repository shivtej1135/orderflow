import {
    createProductService,
    getAllProductsService,
    getProductByIdService,
    updateProductService,
    deleteProductService
} from "../services/product.service.js";

const createProductController = async (req, res, next) => {
    const { name, description, price } = req.body;

    try {
        const product = await createProductService({
            name,
            description,
            price
        });

        res.status(201).json(product);
    } catch (err) {
        next(err);
    }
};

const getAllProductsController = async (req, res, next) => {
    try {
        const products = await getAllProductsService();

        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
};

const getProductByIdController = async (req, res, next) => {
    const { id } = req.params;

    try {
        const product = await getProductByIdService(id);

        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
};

const updateProductController = async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    try {
        const product = await updateProductService(
            id,
            {
                name,
                description,
                price
            }
        );

        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
};

const deleteProductController = async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await deleteProductService(id);

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

export {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController
};