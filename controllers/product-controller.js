const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const { successResponseHandler, readerSuccessResponseHandler } = require("../helpers/success-response-handler");

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

        //Filtering
        const queryObject = { ...req.query };

        const excludeFields = ["page", "sort", "limit", "fields"];

        excludeFields.forEach((element) => delete queryObject[element]);

        let queryString = JSON.stringify(queryObject);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let query = Product.find(JSON.parse(queryString));

        //Sorting 
        if (req.query && req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        //Limitting the fields
        if (req.query && req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v");
        }

        //Pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) {
                let customError = new Error("This page does not exists");
                customError.statusCode = 404;
                throw customError;
            }
        }

        const products = await query;

        return await readerSuccessResponseHandler(res, 200, "Product list fetch successfully!", null, { products });

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