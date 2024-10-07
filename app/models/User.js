// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});


// Method to compare password for authentication
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
