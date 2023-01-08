const { Router } = require("express");

const userRouter = require("./user-route");
const productRouter = require("./product-route");

const router = Router();

router.use("/api/v1/users", userRouter);
router.use("/api/v1/products", productRouter);

module.exports = router;