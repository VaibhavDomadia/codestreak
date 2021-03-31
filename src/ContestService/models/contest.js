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
            name: {
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
    registeredParticipants: {
        type: [mongoose.Types.ObjectId],
        required: true
    }
});

module.exports = mongoose.model('Contest', contestSchema);