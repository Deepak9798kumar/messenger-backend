const User = require('../models/User');

const getUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};

const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
};

const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
};

module.exports = { getUsers, updateUser, deleteUser };
