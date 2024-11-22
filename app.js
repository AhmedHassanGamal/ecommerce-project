const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const databasee=require("./config/db")
// Load environment variables
dotenv.config({ path: 'config.env' });

// Initialize Express app
const app = express();

// Connect to the database
databasee();

// Middleware
app.use(express.json()); // For parsing JSON bodies
app.use(cors()); // For handling cross-origin requests
// image upload
app.use('/uploads', express.static('uploads'));
// Import Routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require("./routes/userRoutes");
const adminRoutes= require('./routes/adminRoutes')
;
// Route Middleware
app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use("/users", userRoutes);
app.use('/admin',adminRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
