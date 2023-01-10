const express = require("express");

const { createProduct, getProductList, getProductInfo, updateProduct, deleteProductInfo } = require("../controllers/product-controller");

const router = express.Router();

//Create New Product
router.post('/', createProduct);

//Update product 
router.put('/', updateProduct);

//Get Product
router.get('/', getProductList);
router.get('/:id', getProductInfo);

//Delete product
router.delete('/:id', deleteProductInfo);

module.exports = router;