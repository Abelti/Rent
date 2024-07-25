const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    phone: String,
    email: String,
    address: String,
    password: String,
    subscription: String,
    payment_method: String,
    payment_info: String,
    id_picture: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
