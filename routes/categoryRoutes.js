const express = require('express');
const authh= require("../middlewares/authMiddleware")
const router = express.Router();
const {
    addCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController');

router.post('/' , addCategory,authh); 
router.get('/', getCategories,authh); 
router.get('/:id', getCategoryById); 
router.put('/:id', updateCategory,authh); 
router.delete('/:id', deleteCategory); 

module.exports = router;
