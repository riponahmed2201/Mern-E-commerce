const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/auth-middleware");
const ValidateRequestHandler = require("../middlewares/validation-request-handler");

const { createProduct, getProductList, getProductInfo, updateProduct, deleteProductInfo } = require("../controllers/product-controller");

const productRouter = express.Router();


productRouter.post('/', authMiddleware, isAdmin, ValidateRequestHandler, createProduct);
productRouter.put('/', authMiddleware, isAdmin, ValidateRequestHandler, updateProduct);

productRouter.get('/', authMiddleware, isAdmin, ValidateRequestHandler, getProductList);

productRouter.get('/:id', authMiddleware, isAdmin, ValidateRequestHandler, getProductInfo);
productRouter.delete('/:id', authMiddleware, isAdmin, ValidateRequestHandler, deleteProductInfo);

module.exports = productRouter;