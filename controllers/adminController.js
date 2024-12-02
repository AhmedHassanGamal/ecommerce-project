const User = require('../models/User');
const Product = require('../models/Product');
const multer = require("multer");
const path = require("path");
const Category = require('../models/Category');

// إدارة الفئات (Categories)
exports.addCategory = async (req, res) => {
    const { name, subcategories } = req.body;
    try {
        const newCategory = new Category({
            name,
            subcategories: subcategories || [],
        });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add category' });
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    const { name, subcategories } = req.body;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name, subcategories },
            { new: true }
        );
        if (!updatedCategory) return res.status(404).json({ error: 'Category not found' });
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category' });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json({ error: 'Category not found' });
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
};

exports.addProduct = async (req, res) => {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
  
      const { name, price, category, subcategory } = req.body;
      try {
        const categoryExists = await Category.findById(category);
        if (!categoryExists)
          return res.status(404).json({ error: "Category not found" });
  
        const subcategoryExists = categoryExists.subcategories.find(
          (sub) => sub.name === subcategory
        );
        if (!subcategoryExists)
          return res
            .status(400)
            .json({ error: "Subcategory not found in this category" });
  
        const newProduct = new Product({
          name,
          price,
          category,
          subcategory,
          image: req.file ? req.file.path : null, 
        });
  
        await newProduct.save();
        res.status(201).json(newProduct);
      } catch (error) {
        res.status(500).json({ error: "Failed to add product" });
      }
    });
  };
  
  
  // Upload images
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png/;
      const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = fileTypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      }
    },
  });
  
  
  // Get all products
  exports.getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  };
  
  // Get a single product by ID
  exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  };
  
  // Update a product
  exports.updateProduct = async (req, res) => {
    const { name, price, category } = req.body;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { name, price, category },
        { new: true }
      );
      if (!updatedProduct)
        return res.status(404).json({ error: "Product not found" });
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  };
  
  // Delete a product
  exports.deleteProduct = async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct)
        return res.status(404).json({ error: "Product not found" });
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  };


//get all users
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

        if (!updatedUser ) return res.status(404).json({ error: 'User not found' });
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
