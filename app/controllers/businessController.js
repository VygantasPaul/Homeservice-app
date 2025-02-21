const Business = require('../models/Business');

// Get all businesses
const getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find();
        res.json(businesses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get business by ID
const getBusinessById = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) {
            return res.status(404).json({ message: 'Verslas nerastas' });
        }
        res.json(business);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new business
const createBusiness = async (req, res) => {
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
};

module.exports = {
    getAllBusinesses,
    getBusinessById,
    createBusiness,
};
