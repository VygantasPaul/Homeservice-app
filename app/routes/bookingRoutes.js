const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Assuming you have a Booking model set up
const authenticateToken = require('../middleware/authenticateToken');
// Create a booking
router.post('/business/:businessId', authenticateToken, async (req, res) => {
    const { businessId } = req.params;  // Get businessId from route parameters
    const { date, service } = req.body;  // Get booking details from the request body
    const userId = req.user._id;  // Use the user ID from the authenticated token
    // Debugging logs to check the values
    console.log('User ID:', userId);
    console.log('Business ID:', businessId);
    try {
        const newBooking = new Booking({
            user_id: userId,          // The user ID from the token
            business_id: businessId,  // The business ID from the route
            date,
            service,
        });

        await newBooking.save();
        res.status(201).json({
            message: 'Booking successful',
            booking: newBooking,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Booking failed',
            error,
        });
    }
});

// Get bookings by business ID
router.get('/business/:businessId', async (req, res) => {
    const { businessId } = req.params;

    try {
        const bookings = await Booking.find({ business: businessId });
        if (!bookings.length) {
            return res.status(404).json({ message: 'No bookings found for this business' });
        }
        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving bookings',
            error,
        });
    }
});

// Get bookings by user ID
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.find({ user: userId });
        if (!bookings.length) {
            return res.status(404).json({ message: 'No bookings found' });
        }
        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving bookings',
            error,
        });
    }
});

// Get all bookings (Admin purpose)
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        if (!bookings.length) {
            return res.status(404).json({ message: 'No bookings found' });
        }
        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving bookings',
            error,
        });
    }
});

module.exports = router;
