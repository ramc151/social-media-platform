const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            comment: { type: String }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema)