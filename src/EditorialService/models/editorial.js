const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const editorialSchema = new Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    problemID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    handle: {
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
    comments: [
        {
            type: new Schema({
                userID: {
                    type: mongoose.Types.ObjectId,
                    required: true
                },
                handle: {
                    type: String,
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
                replies: [
                    {
                        type: new Schema({
                            userID: {
                                type: mongoose.Types.ObjectId,
                                required: true
                            },
                            handle: {
                                type: String,
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
                        },
                        {timestamps: true})
                    }
                ]
            },
            {timestamps: true})
        }
    ]
},
{timestamps: true});

module.exports = mongoose.model('Editorial', editorialSchema);