const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,

    },
    url: {
        type: String,

    },
});

module.exports = mongoose.model('Category', categorySchema);
