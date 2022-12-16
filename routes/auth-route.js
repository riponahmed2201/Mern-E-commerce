const express = require("express");

const { registerUser, loginUser } = require("../controllers/auth-controller");

const ValidateRequestHandler = require("../middlewares/validation-request-handler");

const UserAddRequest = require("../requests/register-user-request");

const authRouter = express.Router();

authRouter.post('/register', UserAddRequest, ValidateRequestHandler, registerUser);
authRouter.post('/login', loginUser);

module.exports = authRouter;