const express = require("express");

const { getAllUser, getSingleUser, deleteUser, updateUser } = require("../controllers/user-controller");

const userRouter = express.Router();

userRouter.get('/', getAllUser);
userRouter.put('/', updateUser);
userRouter.get('/:id', getSingleUser);
userRouter.delete('/:id', deleteUser);


module.exports = userRouter;