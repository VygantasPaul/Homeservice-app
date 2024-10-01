const express = require('express');
const router = express.Router();
const Business = require('../models/Business');

// Gauti visus verslus
router.get('/', async (req, res) => {
    try {
        const businesses = await Business.find().populate('category');
        res.json(businesses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Pridėti naują verslą
router.post('/', async (req, res) => {
    const business = new Business({
        name: req.body.name,
        category: req.body.category,
        address: req.body.address,
        phone: req.body.phone,
        description: req.body.description,
        services: req.body.services,
        website: req.body.website,
    });

    try {
        const newBusiness = await business.save();
        res.status(201).json(newBusiness);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
