const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const problemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    statement: {
        type: [String],
        required: true
    },
    samplecases: {
        type: [{
            input: {
                type: [String],
                required: true
            },
            output: {
                type: [String],
                required: true
            }
        }],
        required: true
    },
    hiddencases: {
        type: [{
            input: {
                type: [String],
                required: true
            },
            output: {
                type: [String],
                required: true
            }
        }],
        required: true
    },
    constraints: {
        type: [String],
        required: true
    },
    numberOfSubmission: {
        type: Number,
        default: 0
    },
    solvedBy: {
        type: Number,
        default: 0
    },
    timeLimit: {
        type: Number,
        default: 1000
    },
    memory: {
        type: Number,
        default: 256
    },
    tags: {
        type: [String],
        required: true
    },
    contestID: mongoose.Types.ObjectId,
    accessTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Problem', problemSchema);