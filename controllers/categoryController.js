const Category = require('../models/Category');

// Add a new category
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
