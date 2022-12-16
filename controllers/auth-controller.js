const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");

const { successResponseHandler } = require("../helpers/success-response-handler");

const User = require('../models/user-model');

const registerUser = asyncHandler(async (req, res) => {

    try {
        const findUser = await User.findOne({ email: req.body.email });

        if (!findUser) {

            const addNewUser = await User.create(req.body);

            await successResponseHandler(res, 200, "User Created successfully!", "details", addNewUser);

        } else {
            throw new Error("User already exists");
        }
    } catch (error) {
        throw error;
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //Check if user exists or not
    const findUser = await User.findOne({ email });

    if (findUser && await findUser.isPasswordMatched(password)) {

        res.json({
            msg: "User login successfully",
            success: true,
            statusCode: 200,
            user: {
                _id: findUser?._id,
                firstName: findUser?.firstName,
                lastName: findUser?.lastName,
                email: findUser?.email,
                mobile: findUser?.mobile,
                token: generateToken(findUser?._id)
            }
        });

    } else {
        throw new Error("Invalid Credentials");
    }
});

module.exports = { registerUser, loginUser };