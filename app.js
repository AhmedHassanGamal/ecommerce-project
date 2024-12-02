const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const databaseConnect = require('./config/db');

// تحميل المتغيرات من ملف البيئة
dotenv.config({ path: 'config.env' });

// إنشاء تطبيق Express
const app = express();

// الاتصال بقاعدة البيانات
databaseConnect();

// Middleware
app.use(express.json()); // تحويل الطلبات من نوع JSON
app.use(cors()); // تمكين CORS
app.use('/uploads', express.static('uploads')); // خدمة الملفات الثابتة من مجلد 'uploads'

// تحميل المسارات
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// استخدام المسارات
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

// Middleware لمعالجة الأخطاء
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});

// بدء الخادم
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
