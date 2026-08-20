import {
    createProduct,
    findAllProducts,
    findProductById,
    updateProduct,
    deleteProduct
} from "../models/product.model.js";

import AppError from "../utils/errors.js";

const createProductService = async ({ name, description, price }) => {
    try {
        const product = await createProduct({
            name,
            description,
            price
        });

        return product;
    } catch (err) {
        throw err;
    }
};

const getAllProductsService = async () => {
    try {
        const products = await findAllProducts();

        return products;
    } catch (err) {
        throw err;
    }
};

const getProductByIdService = async (id) => {
    try {
        const product = await findProductById(id);

        if (!product) {
            throw new AppError("Product not found", 404);
        }

        return product;
    } catch (err) {
        throw err;
    }
};

const updateProductService = async (
    id,
    { name, description, price }
) => {
    try {
        const existingProduct = await findProductById(id);

        if (!existingProduct) {
            throw new AppError("Product not found", 404);
        }

        const updatedProduct = await updateProduct(
            id,
            {
                name,
                description,
                price
            }
        );

        return updatedProduct;
    } catch (err) {
        throw err;
    }
};

const deleteProductService = async (id) => {
    try {
        const existingProduct = await findProductById(id);

        if (!existingProduct) {
            throw new AppError("Product not found", 404);
        }

        await deleteProduct(id);

        return {
            message: "Product deleted successfully"
        };
    } catch (err) {
        throw err;
    }
};

export {
    createProductService,
    getAllProductsService,
    getProductByIdService,
    updateProductService,
    deleteProductService
};