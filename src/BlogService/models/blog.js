const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    userID: {
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

module.exports = mongoose.model('Blog', blogSchema);