const asyncHandler = require('express-async-handler');

const User = require('../models/user.model');

// @desc    get users
// @route   GET /api/users
// @access  PRIVATE
const getUsers = asyncHandler(async (req, res) => {
    console.log({user: req.user})
    const users = await User.find({});
    res.status(200).json(users);
})

// @desc    add user
// @route   POST /api/users
// @access  PRIVATE
const addUser = asyncHandler(async (req, res) => {
    console.log("received ", req.body)
    ///hakdog
    if (!req.body.firstname && !req.body.lastname) {
        res.status(400)
        throw new Error("request body requirements not met");
    }

    const user = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
    })

    res.status(200).json(user);
})

// @desc    update users
// @route   PUT /api/users
// @access  PRIVATE
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(400)
        throw new Error("User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log({ updatedUser })
    res.status(200).json(updatedUser);

})

// @desc    delete users
// @route   DELETE /api/users
// @access  PRIVATE
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    console.info("id: ", req.params.id);
    if (!user) {
        res.status(400)
        throw new Error("User not found");
    }

    await user.remove();

    res.status(200).json({ id: req.params.id });
})

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
}