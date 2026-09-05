import {createProductService,getAllProductsService,getProductByIdService,
    updateProductService,
    deleteProductService
} from "../services/product.service.js";
import { getCached, setCached ,invalidate } from "../services/cache.service.js";

const createProductController = async (req, res, next) => {
    const { name, description, price } = req.body;

    try {
        const product = await createProductService({
            name,
            description,
            price
        });
        // Product list cache is stale after creating a new product
        await invalidate("product:list");

        res.status(201).json(product);
    } catch (err) {
        console.log("CREATE PRODUCT ERROR:", err);
        next(err);
    }
};

const getAllProductsController = async (req, res, next) => {
    try {

        // Redis key for product list
        const cacheKey = "product:list";

        // Try fetching product list from Redis
        const cachedProducts = await getCached(cacheKey);

        // If found in cache, return immediately
        if (cachedProducts) {
            console.log(`CACHE HIT: ${cacheKey}`);

            return res.status(200).json(cachedProducts);
        }

        // Product list not found in cache
        console.log(`CACHE MISS: ${cacheKey}`);

        // Fetch product list from PostgreSQL
        const products = await getAllProductsService();

        // Store product list in Redis for future requests
        await setCached(cacheKey, products);

        // Return product list fetched from PostgreSQL
        res.status(200).json(products);

    } catch (err) {
        next(err);
    }
};

const getProductByIdController = async (req, res, next) => {
    const { id } = req.params;

    try {
         // Redis key for this product
        const cacheKey = `product:${id}`;

        // Try fetching product from Redis cache
        const cachedProduct = await getCached(cacheKey);

        // If found in cache, return immediately
        if (cachedProduct) {
            console.log(`CACHE HIT: ${cacheKey}`);

            return res.status(200).json(cachedProduct);
        }

        // Product not found in cache
        console.log(`CACHE MISS: ${cacheKey}`);

         // Fetch product from PostgreSQL
        const product = await getProductByIdService(id);

        // Store product in Redis for future requests
        await setCached(cacheKey,product);

        // Return product fetched from PostgreSQL
        res.status(200).json(product);

    } catch (err) {
        next(err);
    }
};

const updateProductController = async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    try {
        const product = await updateProductService(id,{name,description,price});

        // Product detail cache is stale after update
        await invalidate(`product:${id}`);

        // Product list cache is stale after update
        await invalidate("product:list"); // array of all products

        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
};

const deleteProductController = async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await deleteProductService(id);
        // Product detail cache is stale after deletion
        await invalidate(`product:${id}`);

        // Product list cache is stale after deletion
        await invalidate("product:list");

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