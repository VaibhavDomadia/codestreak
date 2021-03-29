const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    handle: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    country: String,
    problemSolved: Number,
    problemAttempted: Number,
    organization: String,
    rating: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);