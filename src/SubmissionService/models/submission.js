const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    problemID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    problemName: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    handle: {
        type: String,
        required: true
    },
    language: {
        type: String,
        require: true
    },
    code: {
        type: String,
        default: ''
    },
    accessTime: {
        type: Date,
        required: true
    },
    verdict: {
        type: {
            result: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            },
            time: {
                type: Number,
                required: true
            },
            log: {
                type: [String],
                required: true
            }
        },
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Submission', submissionSchema);