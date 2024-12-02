const express = require('express');
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes for Categories
router.get('/categories', auth('admin'), adminController.getCategories);
router.post('/categories', auth('admin'), adminController.addCategory);
router.get('/categories/:id', auth('admin'), adminController.getCategoryById);
router.put('/categories/:id', auth('admin'), adminController.updateCategory);
router.delete('/categories/:id', auth('admin'), adminController.deleteCategory);

// Routes for Products
router.get('/products', auth('admin'), adminController.getProducts);
router.get('/products/:id', auth('admin'), adminController.getProductById);
router.post('/products', auth('admin'), adminController.addProduct);
router.put('/products/:id', auth('admin'), adminController.updateProduct);
router.delete('/products/:id', auth('admin'), adminController.deleteProduct);

// Routes for Users
router.get('/users', auth('admin'), adminController.getUsers);
router.delete('/users/:id', auth('admin'), adminController.deleteUser);
router.put('/users/:id', auth('admin'), adminController.updateUser);
router.get('/users/:id', auth('admin'), adminController.getUserById);

module.exports = router;
