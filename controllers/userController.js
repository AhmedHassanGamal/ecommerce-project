const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let updatedData = { username, email};

        // Hash password if it's updated
        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ msg: 'Suecess update user' ,updatedUser});
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });
        res.json({ msg: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};
