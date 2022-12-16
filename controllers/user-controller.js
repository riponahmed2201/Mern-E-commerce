const asyncHandler = require("express-async-handler");

const { successResponseHandler } = require("../helpers/success-response-handler");

const User = require('../models/user-model');

//Update to the user 
const updateUser = asyncHandler(async (req, res) => {
    try {

        const { firstName, lastName, email, mobile } = req.body;

        const userInfo = await User.findById(req.body.id);

        if (!userInfo) {
            let customError = new Error("User not found");
            customError.statusCode = 404;
            throw customError;
        }

        const user = new User(userInfo);

        let isChanged = false;

        if (firstName && firstName !== userInfo.firstName) {
            isChanged = true;
            user.firstName = firstName;
        }

        if (lastName && lastName !== userInfo.lastName) {
            isChanged = true;
            user.lastName = lastName;
        }

        if (email && email !== userInfo.email) {
            isChanged = true;
            user.email = email;
        }

        if (mobile && mobile !== userInfo.mobile) {
            isChanged = true;
            user.mobile = mobile;
        }

        if (isChanged) {
            const updateUserInfo = await user.save();

            res.json({
                msg: "User updated successfully",
                success: true,
                statusCode: 200,
                user: updateUserInfo
            });
        }

        res.json({
            msg: "User updated successfully",
            success: true,
            statusCode: 200,
            user: userInfo
        });

    } catch (error) {
        throw new Error(error);
    }
});

//Get all user
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();

        res.json({
            msg: "User list fetch successfully",
            success: true,
            statusCode: 200,
            users: getUsers
        });
    } catch (error) {
        throw new Error(error);
    }
});

//Get a single user
const getSingleUser = asyncHandler(async (req, res) => {
    try {

        const { id } = req.params;

        const getUser = await User.findById(id);

        res.json({
            msg: "User info fetch successfully",
            success: true,
            statusCode: 200,
            user: getUser
        });
    } catch (error) {
        throw new Error(error);
    }
});

//Delete user
const deleteUser = asyncHandler(async (req, res) => {
    try {

        const { id } = req.params;

        const getUser = await User.findByIdAndDelete(id);

        res.json({
            msg: "User deleted successfully",
            success: true,
            statusCode: 200
        });
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { getAllUser, getSingleUser, deleteUser, updateUser };