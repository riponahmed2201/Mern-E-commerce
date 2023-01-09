const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const { successResponseHandler } = require("../helpers/success-response-handler");

const Product = require("../models/product-model");
const validateMongoDbId = require("../utils/validationMongodbId");

const createProduct = asyncHandler(async (req, res) => {
    try {

        //Generate product slug using slugify package
        if (req.body.title) req.body.slug = slugify(req.body.title);

        const newProduct = await Product.create(req.body);

        return await successResponseHandler(res, 201, "Product Created successfully!", "details", newProduct);

    } catch (error) {
        throw error;
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    try {

        await validateMongoDbId(req.body.id);

        const updateData = req.body;

        const productInfo = await Product.findById(req.body.id);

        if (!productInfo) {
            let customError = new Error("Invalid product info!");
            customError.statusCode = 404;
            throw customError;
        }

        const productData = new Product(productInfo);

        let isChanged = false;

        if (updateData.title && productInfo.title !== updateData.title) {
            isChanged = true;
            productData.title = updateData.title;
        }

        //Generate product slug using slugify package
        if (req.body.title) req.body.slug = slugify(req.body.title);

        const updateProduct = await Product.create(req.body);

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