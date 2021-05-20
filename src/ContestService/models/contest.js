const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    numberOfRegisteredParticipants: {
        type: String,
        default: 0
    },
    setters: {
        type: [{
            handle: {
                type: String,
                required: true
            },
            userID: {
                type: mongoose.Types.ObjectId,
                required: true
            }
        }],
        required: true
    },
    information: {
        type: [String],
        required: true
    },
    problemIDs: {
        type: [mongoose.Types.ObjectId],
        required: true
    },
    ratingsUpdated: {
        type: Boolean,
        default: false
    },
    registeredParticipants: {
        type: [{
            handle: {
                type: String,
                required: true
            },
            userID: {
                type: mongoose.Types.ObjectId,
                required: true
            }
        }],
        required: true
    },
    standings: {
        type: [{
            userID: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            handle: {
                type: String,
                required: true
            },
            timeTaken: {
                type: Number,
                required: true
            },
            problemSolved: {
                type: [mongoose.Types.ObjectId]
            }
        }]
    }
});

module.exports = mongoose.model('Contest', contestSchema);