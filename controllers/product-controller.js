const asyncHandler = require("express-async-handler");

const { successResponseHandler } = require("../helpers/success-response-handler");

const Product = require("../models/product-model");
const validateMongoDbId = require("../utils/validationMongodbId");

const createProduct = asyncHandler(async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);

        return await successResponseHandler(res, 201, "Product Created successfully!", "details", newProduct);

    } catch (error) {
        throw error;
    }
});

const getProductList = asyncHandler(async (req, res) => {
    try {

        const products = await Product.find();

        return await successResponseHandler(res, 200, "Product list fetch successfully!", "details", products);

    } catch (error) {
        throw error;
    }
});

const getProductInfo = asyncHandler(async (req, res) => {
    try {

        await validateMongoDbId(req.params.id);

        const productInfo = await Product.findById(req.params.id);

        return await successResponseHandler(res, 200, "Product info fetch successfully!", "details", productInfo);

    } catch (error) {
        throw error;
    }
});

module.exports = { createProduct, getProductList, getProductInfo };