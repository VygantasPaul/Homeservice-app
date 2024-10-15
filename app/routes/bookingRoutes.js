const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authenticateToken = require('../middleware/authenticateToken');

// Create a booking
router.post('/business/:businessId', authenticateToken, bookingController.createBooking);

// Get bookings by business ID
router.get('/business/:businessId', bookingController.getBookingsByBusinessId);

// Get bookings by user ID
router.get('/:userId', bookingController.getBookingsByUserId);

// Get all bookings (Admin purpose)
router.get('/', bookingController.getAllBookings);

module.exports = router;
