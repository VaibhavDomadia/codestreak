const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    handle: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    country: String,
    problemSolved: Number,
    problemAttempted: Number,
    organization: String,
    rating: {
        type: Number,
        default: 2000
    },
    following: [mongoose.Types.ObjectId],
    followedBy: [mongoose.Types.ObjectId],
    profileImage: String,
    emailVerificationToken: String,
    resetPasswordToken: String,
    resetPasswordTokenExpiryTime: Date
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);