const express = require("express");

//Middleware
const ValidateRequestHandler = require("../middlewares/validation-request-handler");
const { authMiddleware, isAdmin } = require("../middlewares/auth-middleware");

//Request
const UserRegisterRequest = require("../requests/user-register-request");
const UserLoginRequest = require("../requests/user-login-request");

//Controller
const { registerUser, loginUser, getAllUser, getSingleUser, deleteUser, updateUser, blockUser, unBlockUser, handleRefreshToken, logout, updatePassword } = require("../controllers/user-controller");

const userRouter = express.Router();

userRouter.get('/', ValidateRequestHandler, getAllUser);
userRouter.put('/', authMiddleware, ValidateRequestHandler, updateUser);

userRouter.post('/register', UserRegisterRequest, ValidateRequestHandler, registerUser);
userRouter.post('/login', UserLoginRequest, loginUser);

//handle refresh token
userRouter.get('/refresh-token', handleRefreshToken);

//Logout
userRouter.get('/logout', logout);

//Update password
userRouter.get('/update-password', authMiddleware, updatePassword);

userRouter.put('/blocked/:id', authMiddleware, isAdmin, ValidateRequestHandler, blockUser);
userRouter.put('/unblocked/:id', authMiddleware, isAdmin, ValidateRequestHandler, unBlockUser);

userRouter.get('/:id', authMiddleware, isAdmin, ValidateRequestHandler, getSingleUser);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;