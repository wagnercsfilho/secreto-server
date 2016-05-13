var mongoose = require('mongoose');

var Post = mongoose.model('Post', {
    text: String,
    imageBackground: String,
    quotebg: String,
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    location: mongoose.Schema.Types.Mixed,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post;