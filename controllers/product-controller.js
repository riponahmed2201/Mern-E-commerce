const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const { successResponseHandler } = require("../helpers/success-response-handler");

const Product = require("../models/product-model");
const validateMongoDbId = require("../utils/validationMongodbId");

const createProduct = asyncHandler(async (req, res) => {
    try {

        //Generate product slug using slugify package
        if (req.body.title) req.body.slug = await slugify(req.body.title);

        const newProduct = await Product.create(req.body);

        return await successResponseHandler(res, 201, "Product Created successfully!", "details", newProduct);

    } catch (error) {
        throw error;
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    try {

        //Validate mongoId
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

            //Generate product slug
            productData.slug = await slugify(req.body.title);
        }

        if (updateData.description && productInfo.description !== updateData.description) {
            isChanged = true;
            productData.description = updateData.description;
        }

        if (updateData.price && productInfo.price !== updateData.price) {
            isChanged = true;
            productData.price = updateData.price;
        }

        if (updateData.quantity && productInfo.quantity !== updateData.quantity) {
            isChanged = true;
            productData.quantity = updateData.quantity;
        }

        if (updateData.color && productInfo.color !== updateData.color) {
            isChanged = true;
            productData.color = updateData.color;
        }

        if (updateData.brand && productInfo.brand !== updateData.brand) {
            isChanged = true;
            productData.brand = updateData.brand;
        }

        if (updateData.category && productInfo.category !== updateData.category) {
            isChanged = true;
            productData.category = updateData.category;
        }

        let updateProduct = productInfo;

        if (isChanged) {
            updateProduct = await productData.save();
        }

        return await successResponseHandler(res, 200, "Product updated successfully!", "details", updateProduct);

    } catch (error) {
        throw error;
    }
});

const getProductList = asyncHandler(async (req, res) => {
    try {

        const products = await Product.find();
        const totalProduct = await Product.find().count();

        return await successResponseHandler(res, 200, "Product list fetch successfully!", "details", { total: totalProduct, products });

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

const deleteProductInfo = asyncHandler(async (req, res) => {
    try {

        await validateMongoDbId(req.params.id);

        const deleteproduct = await Product.findByIdAndDelete(req.params.id);

        return await successResponseHandler(res, 200, "Product deleted successfully!", null, null);

    } catch (error) {
        throw error;
    }
});

module.exports = { createProduct, getProductList, getProductInfo, updateProduct, deleteProductInfo };