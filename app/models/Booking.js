// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User',  },
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business',  },
    date: { type: Date, },
    service: { type: String, },
});

module.exports = mongoose.model('Booking', bookingSchema);
