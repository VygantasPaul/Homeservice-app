const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');

// Get all businesses
router.get('/', businessController.getAllBusinesses);

// Get a business by ID
router.get('/:id', businessController.getBusinessById);

// Create a new business
router.post('/', businessController.createBusiness);

module.exports = router;
