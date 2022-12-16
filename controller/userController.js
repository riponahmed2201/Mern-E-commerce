const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");

const User = require('../models/userModel');

const createUser = asyncHandler(async (req, res) => {

    const findUser = await User.findOne({ email: req.body.email });

    if (!findUser) {
        //Create a new user
        const newUser = await User.create(req.body);

        res.json({
            msg: "User Created successfully",
            success: true,
            statusCode: 201,
            user: newUser
        });

    } else {
        //User already exists
        // res.json({
        //     msg: "User already exists",
        //     success: false,
        //     statusCode: 409,
        // });
        throw new Error("User already exists");
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


module.exports = { createUser, loginUser };