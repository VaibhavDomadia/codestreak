const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    problemID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    userID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    verdict: {
        result: {
            type: String,
            required: true
        },
        log: {
            type: String,
            required: true
        }
    }
}, {timestamps: true});

module.exports = mongoose.model('Submission', submissionSchema);