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
    status: {
        type: String,
        default: 'Pending'
    },
    message: {
        type: String,
        default: 'Your proposal for the problem has been sent. Admin will look at your request and will get back to you soon.'
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
            memory: {
                type: Number,
                required: true
            },
            tags: {
                type: [String],
                required: true
            }
        },
        required: true
    },
    chat: [
        {
            type: new Schema({
                sentBy: {
                    type: String,
                    required: true
                },
                message: {
                    type: String,
                    required: true
                }
            },
            {timestamps: true})
        }
    ]
},
{timestamps: true});

module.exports = mongoose.model('Proposal', proposalSchema);