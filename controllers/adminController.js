const Admin = require('../models/Admin'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ message: 'Invalid username or password.' });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed.', error });
    }
};

exports.addAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this username already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ username, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ message: 'Admin added successfully!', admin: newAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Error adding admin.', error });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found.' });
        }

        res.status(200).json({ message: 'Admin updated successfully!', admin: updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Error updating admin.', error });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAdmin = await Admin.findByIdAndDelete(id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin not found.' });
        }

        res.status(200).json({ message: 'Admin deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admin.', error });
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({}, '-password'); 
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admins.', error });
    }
};

exports.getAdminById = async (req, res) => {
    try {
        const { id } = req.params;

        const admin = await Admin.findById(id, '-password'); 
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found.' });
        }

        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin.', error });
    }
};
