const express = require("express");

const { createProduct, getProductList, getProductInfo } = require("../controllers/product-controller");

const router = express.Router();

//Create New Product
router.post('/', createProduct);

//Get Product
router.get('/', getProductList);
router.get('/:id', getProductInfo);

module.exports = router;