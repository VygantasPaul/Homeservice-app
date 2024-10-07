const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get category by ID
router.get('/:id', categoryController.getCategoryById);

// Create a new category
router.post('/', categoryController.createCategory);

// Update category by ID
router.patch('/:id', categoryController.updateCategory);

// Delete category by ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
