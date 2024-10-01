const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    category: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    services: {
        type: [String],  // Paslaugos, kurias teikia verslas
    },
    website: {
        type: String,
    },
});

module.exports = mongoose.model('Business', businessSchema);
