const { Router } = require("express");

const authRouter = require("./auth-route");
const userRouter = require("./user-route");

const router = Router();

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/user", userRouter);

module.exports = router;