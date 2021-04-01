const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const proposalSchema = new Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    handle: {
        type: String,
        required: true
    },
    problem: {
        type: {
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
                type: [
                    {
                        input: {
                            type: [String],
                            required: true
                        },
                        output: {
                            type: [String],
                            required: true
                        }
                    }
                ],
                required: true
            },
            hiddencases: {
                type: [
                    {
                        input: {
                            type: [String],
                            required: true
                        },
                        output: {
                            type: [String],
                            required: true
                        }
                    }
                ],
                required: true
            },
            constraints: {
                type: [String],
                required: true
            },
            timeLimit: {
                type: Number,
                required: true
            },
            memoryLimit: {
                type: Number,
                required: true
            },
            tags: {
                type: [String],
                required: true
            }
        },
        required: true
    }
});

module.exports = mongoose.model('Proposal', proposalSchema);