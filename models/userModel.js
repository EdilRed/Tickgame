const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please fill your name!']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;