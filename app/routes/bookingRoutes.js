// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.post('/', async (req, res) => {
    const { userId, businessId, date, service } = req.body;

    try {
        const newBooking = new Booking({
            user: userId,
            business: businessId,
            date,
            service,
        });

        await newBooking.save();
        res.status(201).json({ message: 'Booking successful', booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: 'Booking failed', error });
    }
});

module.exports = router;
