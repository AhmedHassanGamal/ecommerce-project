const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const databaseConnect = require('./config/db');

// Load environment variables
dotenv.config({ path: 'config.env' });

// Initialize Express app
const app = express();

// Connect to the database
databaseConnect();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests
app.use('/uploads', express.static('uploads')); // Serve static files from 'uploads' folder

const authRoutes = require('./routes/authRoutes');
// const categoryRoutes = require('./routes/adm');
// const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Use Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

// Error Handling Middleware (Optional, for better debugging)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
