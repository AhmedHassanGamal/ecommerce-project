const express = require('express');
// const adminController = require('../controllers/adminController');
const authh = require('../middlewares/authMiddleware');
const router = express.Router();
const{
    login,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    getAllAdmins,
    getAdminById
} =require('../controllers/adminController');
router.post('/login', login);
router.post('/', authh, addAdmin);
router.put('/:id', authh, updateAdmin);
router.delete('/:id', authh, deleteAdmin);
router.get('/', authh, getAllAdmins);
router.get('/:id', authh, getAdminById);

module.exports = router;
