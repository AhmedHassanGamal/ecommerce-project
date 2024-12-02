const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

// Routes for Categories
router.get('/categories', adminController.getCategories);
router.post('/categories', adminController.addCategory);
router.get('/categories/:id', adminController.getCategoryById);
router.put('/categories/:id', adminController.updateCategory);
router.delete('/categories/:id', adminController.deleteCategory);

// Routes for Products
router.get('/products', adminController.getProducts);
router.get('/products/:id', adminController.getProductById);
router.post('/products', adminController.addProduct);
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);

// Routes for Users
router.get('/users', adminController.getUsers);
router.delete('/users/:id', adminController.deleteUser);
router.put('/users/:id', adminController.updateUser);
router.get('/users/:id', adminController.getUserById);


module.exports = router;
