const asyncHandler = require("express-async-handler");

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

module.exports = { createUser };