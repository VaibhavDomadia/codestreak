const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    numberOfComments: {
        type: Number,
        default: 0
    },
    comments: {
        type: [
            {
                userID: {
                    type: mongoose.Types.ObjectId,
                    required: true
                },
                username: {
                    type: String,
                    required: true
                },
                createdAt: {
                    type: Date,
                    required: true
                },
                stars: {
                    type: Number,
                    default: 0
                },
                content: {
                    type: String,
                    required: true
                },
                replies: {
                    type: [
                        {
                            userID: {
                                type: mongoose.Types.ObjectId,
                                required: true
                            },
                            username: {
                                type: String,
                                required: true
                            },
                            createdAt: {
                                type: Date,
                                required: true
                            },
                            stars: {
                                type: Number,
                                default: 0
                            },
                            content: {
                                type: String,
                                required: true
                            }   
                        }
                    ],
                    required: true
                }
            }
        ],
        required: true
    }

}, {timestamps: true});

module.exports = mongoose.model('Blog', blogSchema);