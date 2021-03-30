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
                require: true
            },
            output: {
                type: [String],
                require: true
            }
        }],
        required: true
    },
    hiddencases: {
        type: [{
            input: {
                type: [String],
                require: true
            },
            output: {
                type: [String],
                require: true
            }
        }],
        required: true
    },
    constraints: {
        type: [String],
        require: true
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
    }
});

module.exports = mongoose.model('Problem', problemSchema);