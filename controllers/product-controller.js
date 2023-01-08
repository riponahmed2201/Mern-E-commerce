const asyncHandler = require("express-async-handler");

const { successResponseHandler } = require("../helpers/success-response-handler");

const Product = require("../models/product-model");

const createProduct = asyncHandler(async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);

        return await successResponseHandler(res, 201, "Product Created successfully!", "details", newProduct);

    } catch (error) {
        throw error;
    }
});

module.exports = { createProduct };