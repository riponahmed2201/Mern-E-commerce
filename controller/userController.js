const User = require('../models/userModel');

const createUser = async (req, res) => {
    const email = req.body.email;

    const findUser = await User.findOne({ email });

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
        res.json({
            msg: "User already exists",
            success: false,
            statusCode: 409,
        })
    }
};

module.exports = { createUser };