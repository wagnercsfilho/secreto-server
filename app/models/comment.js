var mongoose = require('mongoose');


var Comment = mongoose.model('Comment', {
    text: String,
    _post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Comment;